// src/folders/folders.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { eq, and, isNull, desc, asc } from 'drizzle-orm';
import { FolderResponse } from '@repo/schemas';

import { folders } from '../database/schemas';
import { DRIZZLE } from '../database/database.module';
import type { DrizzleDB } from '../database/types/drizzle';
import { CreateFolderDto } from './dto/create-folder.dto';
import { RenameFolderDto } from './dto/rename-folder.dto';

type FolderRow = typeof folders.$inferSelect;

@Injectable()
export class FoldersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  private toResponse(folder: FolderRow): FolderResponse {
    return {
      ...folder,
      createdAt: folder.createdAt.toISOString(),
      updatedAt: folder.updatedAt.toISOString(),
    };
  }

  // ── Create root or sub-folder ──
  async create(userId: string, dto: CreateFolderDto) {
    if (dto.parentId) {
      await this.assertExists(dto.parentId);
    }

    const [folder] = await this.db
      .insert(folders)
      .values({
        ...dto,
        parentId: dto.parentId ?? null,
        createdBy: userId,
      })
      .returning();

    if (!folder) {
      throw new NotFoundException(`Folder with ID ${folder} not found`);
    }

    return this.toResponse(folder);
  }

  // ── Get flat list of all folders for a user ───────────────────────────────
  async findAll(userId: string) {
    return this.db
      .select()
      .from(folders)
      .where(and(eq(folders.createdBy, userId), eq(folders.isDeleted, false)))
      .orderBy(asc(folders.createdAt));
  }

  // ── Get root folders only ─────────────────────────────────────────────────
  async findRoots(userId: string) {
    return this.db
      .select()
      .from(folders)
      .where(and(eq(folders.createdBy, userId), isNull(folders.parentId)));
  }

  // ── Build nested tree from flat list ─────────────────────────────────────
  async getTree(userId: string) {
    const all = await this.findAll(userId);
    return this.buildTree(all);
  }

  async rename(folderId: string, userId: string, dto: RenameFolderDto) {
    await this.assertOwnership(folderId, userId);

    const [updated] = await this.db
      .update(folders)
      .set({ name: dto.name, updatedAt: new Date() })
      .where(eq(folders.id, folderId))
      .returning();

    return this.toResponse(updated!);
  }

  // ── Delete (DB cascade handles children) ─────────────────────────────────
  async delete(folderId: string, userId: string) {
    await this.assertOwnership(folderId, userId);
    const [deleted] = await this.db
      .delete(folders)
      .where(eq(folders.id, folderId))
      .returning();
    return this.toResponse(deleted!);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private async assertOwnership(folderId: string, userId: string) {
    const [folder] = await this.db
      .select()
      .from(folders)
      .where(and(eq(folders.id, folderId), eq(folders.createdBy, userId)));

    if (!folder) throw new NotFoundException(`Folder not found`);
    return folder;
  }

  private async assertExists(folderId: string) {
    const [folder] = await this.db
      .select()
      .from(folders)
      .where(and(eq(folders.id, folderId), eq(folders.isDeleted, false)));

    if (!folder) throw new NotFoundException('Folder not found');
    return folder;
  }

  /** Converts flat DB rows into a nested tree structure */
  private buildTree(flat: FolderRow[]) {
    type Node = FolderResponse & { children: Node[] };
    const map = new Map<string, Node>();
    const roots: Node[] = [];

    for (const f of flat) {
      map.set(f.id, { ...this.toResponse(f), children: [] });
    }

    for (const f of flat) {
      const node = map.get(f.id)!;
      if (f.parentId && map.has(f.parentId)) {
        map.get(f.parentId)!.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}

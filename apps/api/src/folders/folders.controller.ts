import { ZodResponse } from 'nestjs-zod';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { FolderResponseDto } from './dto/folder-response.dto';
import { FolderTreeResponseDto } from './dto/folder-tree-response';
import { RenameFolderDto } from './dto/rename-folder.dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  @ZodResponse({ type: FolderResponseDto })
  @ApiOperation({ summary: 'Create folder or sub Folder' })
  create(@Body() dto: CreateFolderDto, @Session() session: UserSession) {
    return this.foldersService.create(session.user.id, dto);
  }

  @Get('tree')
  @ZodResponse({ type: [FolderTreeResponseDto] })
  @ApiOperation({ summary: 'Get folder tree' })
  getTree(@Session() session: UserSession) {
    return this.foldersService.getTree(session.user.id);
  }

  @Patch(':id/rename')
  @ZodResponse({ type: FolderTreeResponseDto })
  @ApiOperation({ summary: 'Rename folder' })
  rename(
    @Param('id') id: string,
    @Body() dto: RenameFolderDto,
    @Session() session: UserSession,
  ) {
    return this.foldersService.rename(id, session.user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete folder' })
  delete(@Param('id') id: string, @Session() session: UserSession) {
    return this.foldersService.delete(id, session.user.id);
  }
}

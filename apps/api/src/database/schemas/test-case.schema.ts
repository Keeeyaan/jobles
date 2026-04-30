import {
  pgTable,
  text,
  timestamp,
  json,
  boolean,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { user } from './auth.schema';
import { folders } from './folder.schema';

export const testCase = pgTable('test_case', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  steps: json('steps'),
  isAIGenerated: boolean('is_ai_generated').default(false).notNull(),
  aiPrompt: text('ai_prompt'),
  aiModel: text('ai_model'),
  folderId: uuid('folder_id').references(() => folders.id, {
    onDelete: 'set null',
  }),
  createdBy: text('created_by')
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const testCasesRelation = relations(testCase, ({ one }) => ({
  folder: one(folders, {
    fields: [testCase.folderId],
    references: [folders.id],
  }),
}));

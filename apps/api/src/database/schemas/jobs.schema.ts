import { pgTable, serial, pgEnum, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from './auth.schema';

export const jobStatusEnum = pgEnum('status', [
  'pending',
  'applied',
  'interviewed',
  'offered',
  'accepted',
  'rejected',
]);
export const jobTypeEnum = pgEnum('type', [
  'full-time',
  'part-time',
  'contract',
  'internship',
]);

export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  company: text('company').notNull(),
  position: text('position').notNull(),
  description: text('description'),
  status: jobStatusEnum('status').notNull(),
  type: jobTypeEnum('type').notNull(),
  location: text('location'),
  note: text('note'),
  applicationDate: timestamp('application_date').notNull(),
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

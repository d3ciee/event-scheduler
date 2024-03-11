import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const UserSession = sqliteTable('user_session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id').notNull(),
  expiresAt: integer('expires_at').notNull(),
  createdAt: integer('created_at').notNull(),
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
});

export default UserSession
export type TUserSession = typeof UserSession.$inferSelect;
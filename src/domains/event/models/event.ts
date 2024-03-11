import { relations } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import User from '../../user/models/user';

const Event = sqliteTable(
  'event',
  {
    id: text('id').primaryKey(),
    title: text('title').unique().notNull(),
    description:text('description').unique().notNull(),
    date:integer("date").notNull(),
    time:text("time"),
    createdAt: integer('created_at').notNull(),
    createdBy:text("created_by")
  }, (t)=>({
    searchIdx:index("search_idx").on(t.title, t.description)
  })
);

const EventRelations = relations(Event, ({one})=>({
    createdBy:one(User, {fields:[Event.createdBy], references:[User.id] })
}))

export default Event;
export {EventRelations}
export type TEvent = typeof Event.$inferSelect;

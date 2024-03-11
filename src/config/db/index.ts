import { drizzle } from 'drizzle-orm/libsql';
//@ts-ignore
import { createClient } from '@libsql/client';
import * as schema from "./schema"

const client = createClient({
    url: 'file:./.data/local.sqlite'
  });

const db = drizzle(client, { schema })
export default db
export type DB = typeof db;




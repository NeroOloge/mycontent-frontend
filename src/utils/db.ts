import Dexie, { type EntityTable } from 'dexie'

interface Draft {
  id: number;
  title: string;
  content: string;
  preview: string;
  author?: `0x${string}`;
  images: string[];
  tags: string[];
  timestamp: string;
}

const db = new Dexie("DraftsDatabase") as Dexie & {
  drafts: EntityTable<
    Draft,
    'id'
  >
}

db.version(1).stores({
  drafts: '++id, title, content, preview, author, images, tags, timestamp'
})

export type { Draft }
export { db }
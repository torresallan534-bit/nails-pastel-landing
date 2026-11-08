import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';
import { Users } from './payload/collections/Users';
import { Services } from './payload/collections/Services';
import { Gallery } from './payload/collections/Gallery';
import { Media } from './payload/collections/Media';
import { SiteSettings } from './payload/globals/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Nails Pastel Studio CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Services, Gallery, Media],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'nails-pastel-3052829795-super-secret-key-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || process.env.DATABASE_URI || process.env.DATABASE_URL || '',
  }),
});

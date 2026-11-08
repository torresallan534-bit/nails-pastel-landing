import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'
import { Services } from './src/payload/collections/Services'
import { Gallery } from './src/payload/collections/Gallery'

import { ThemeBranding } from './src/payload/globals/ThemeBranding'
import { HeroContent } from './src/payload/globals/HeroContent'
import { SectionsContent } from './src/payload/globals/SectionsContent'
import { PoliciesContent } from './src/payload/globals/PoliciesContent'
import { SiteSettings } from './src/payload/globals/SiteSettings'
import { FooterContent } from './src/payload/globals/FooterContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Centro de Control | Nails Pastel Studio',
    },
  },
  collections: [Users, Services, Gallery, Media],
  globals: [
    ThemeBranding,
    HeroContent,
    SectionsContent,
    PoliciesContent,
    SiteSettings,
    FooterContent,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'nails-pastel-master-secret-key-32ch',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nails-pastel',
    connectOptions: {
      serverSelectionTimeoutMS: 7000,
    },
  }),
  sharp,
})

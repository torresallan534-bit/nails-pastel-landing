import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { payloadCloudinaryPlugin } from '@jhb.software/payload-cloudinary-plugin'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './src/payload/collections/Users'
import { Categories } from './src/payload/collections/Categories'
import { Media } from './src/payload/collections/Media'
import { Services } from './src/payload/collections/Services'
import { Gallery } from './src/payload/collections/Gallery'

import { ThemeBranding } from './src/payload/globals/ThemeBranding'
import { HeroContent } from './src/payload/globals/HeroContent'
import { SectionsContent } from './src/payload/globals/SectionsContent'
import { BookingContent } from './src/payload/globals/BookingContent'
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
  collections: [Users, Categories, Services, Gallery, Media],
  globals: [
    ThemeBranding,
    HeroContent,
    SectionsContent,
    BookingContent,
    PoliciesContent,
    SiteSettings,
    FooterContent,
  ],
  plugins: [
    payloadCloudinaryPlugin({
      cloudName:
        process.env.CLOUDINARY_CLOUD_NAME ||
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        process.env.CLOUDINARY_NAME ||
        '',
      credentials: {
        apiKey: process.env.CLOUDINARY_API_KEY || '',
        apiSecret: process.env.CLOUDINARY_API_SECRET || '',
      },
      collections: {
        media: true,
        gallery: true,
      },
      folder: 'nails-pastel-media',
      enabled: Boolean(
        (process.env.CLOUDINARY_CLOUD_NAME ||
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
          process.env.CLOUDINARY_NAME) &&
          process.env.CLOUDINARY_API_KEY &&
          process.env.CLOUDINARY_API_SECRET
      ),
    }),
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

import { buildConfig } from 'payload';
import { Services } from './collections/Services';
import { Gallery } from './collections/Gallery';
import { Media } from './collections/Media';
import { SiteSettings } from './globals/SiteSettings';

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Nails Pastel CMS',
    },
  },
  collections: [Services, Gallery, Media],
  globals: [SiteSettings],
  typescript: {
    outputFile: './src/payload/payload-types.ts',
  },
});

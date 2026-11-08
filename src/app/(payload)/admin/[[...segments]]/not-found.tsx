import { NotFoundPage } from '@payloadcms/next/views';
import configPromise from '@payload-config';

export default function NotFound() {
  return <NotFoundPage config={configPromise} />;
}

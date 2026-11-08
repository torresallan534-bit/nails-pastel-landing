declare module 'payload' {
  export interface Field {
    name?: string;
    type: string;
    label?: string;
    required?: boolean;
    defaultValue?: any;
    options?: Array<{ label: string; value: string }>;
    min?: number;
    max?: number;
    step?: number;
    relationTo?: string;
    hasMany?: boolean;
    admin?: Record<string, any>;
    fields?: Field[];
    tabs?: Array<{
      label: string;
      fields: Field[];
    }>;
    labels?: {
      singular: string;
      plural: string;
    };
  }

  export interface CollectionConfig {
    slug: string;
    auth?: boolean | Record<string, any>;
    admin?: {
      useAsTitle?: string;
      defaultColumns?: string[];
      group?: string;
      description?: string;
    };
    access?: {
      read?: (...args: any[]) => boolean | Promise<boolean>;
      create?: (...args: any[]) => boolean | Promise<boolean>;
      update?: (...args: any[]) => boolean | Promise<boolean>;
      delete?: (...args: any[]) => boolean | Promise<boolean>;
    };
    upload?: {
      staticDir?: string;
      imageSizes?: Array<{
        name: string;
        width?: number;
        height?: number;
        position?: string;
      }>;
      adminThumbnail?: string;
      mimeTypes?: string[];
    };
    fields: Field[];
  }

  export interface GlobalConfig {
    slug: string;
    label?: string;
    access?: {
      read?: (...args: any[]) => boolean | Promise<boolean>;
      update?: (...args: any[]) => boolean | Promise<boolean>;
    };
    fields: Field[];
  }

  export interface Config {
    admin?: Record<string, any>;
    collections?: CollectionConfig[];
    globals?: GlobalConfig[];
    editor?: any;
    secret?: string;
    typescript?: {
      outputFile?: string;
    };
    db?: any;
    sharp?: any;
    [key: string]: any;
  }

  export function buildConfig(config: Config): Config;
}

declare module '@payloadcms/db-mongodb' {
  export function mongooseAdapter(args: { url: string; [key: string]: any }): any;
}

declare module '@payloadcms/richtext-lexical' {
  export function lexicalEditor(args?: any): any;
}

declare module '@payloadcms/next/withPayload' {
  export function withPayload(config: any): any;
}

declare module '@payloadcms/next/views' {
  import type { Metadata } from 'next';
  export function RootPage(args: any): any;
  export function generatePageMetadata(args: any): Promise<Metadata>;
  export function NotFoundPage(args: any): any;
}

declare module '@payloadcms/next/layouts' {
  import React from 'react';
  export const RootLayout: React.FC<{ config: any; children: React.ReactNode }>;
}

declare module '@payloadcms/next/routes' {
  export function REST_GET(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
  export function REST_POST(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
  export function REST_DELETE(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
  export function REST_PATCH(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
  export function REST_OPTIONS(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
}

declare module '@payload-config' {
  const configPromise: Promise<any>;
  export default configPromise;
}

declare module 'payload' {
  export type ServerFunctionClient = (args: any) => Promise<any>;

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
      hidden?: any;
      [key: string]: any;
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
    admin?: {
      group?: string;
      description?: string;
      hidden?: any;
      [key: string]: any;
    };
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
    plugins?: any[];
    [key: string]: any;
  }

  export function buildConfig(config: Config): Config;
  export function getPayload(args: { config: any }): Promise<any>;
}

declare module 'sharp' {
  const sharp: any;
  export default sharp;
}

declare module '@payloadcms/db-mongodb' {
  export function mongooseAdapter(args: { url: string; connectOptions?: any; [key: string]: any }): any;
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
  export const RootLayout: React.FC<{ config: any; importMap?: any; serverFunction?: any; children: React.ReactNode }>;
  export function handleServerFunctions(args: any): Promise<any>;
}

declare module '@payloadcms/next/routes' {
  export function REST_GET(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
  export function REST_POST(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
  export function REST_DELETE(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
  export function REST_PATCH(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
  export function REST_PUT(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
  export function REST_OPTIONS(configPromise: any): (req: Request, ...rest: any[]) => Promise<Response>;
}

declare module '@payload-config' {
  const configPromise: any;
  export default configPromise;
}

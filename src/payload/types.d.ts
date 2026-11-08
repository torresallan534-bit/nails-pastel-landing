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
    typescript?: {
      outputFile?: string;
    };
    [key: string]: any;
  }

  export function buildConfig(config: Config): Config;
}

import '@plone/registry';
import type { RichResultTypeConfig } from './registry';

declare module '@plone/registry' {
  export interface ConfigType {
    settings: {
      richresults?: {
        types: Record<string, RichResultTypeConfig>;
      };
      [key: string]: any;
    };
  }
}

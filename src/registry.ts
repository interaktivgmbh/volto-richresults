/**
 * Rich Result Type Configuration
 */
export interface RichResultTypeConfig {
  id: string;
  title: string;
  description: string;
  schema: (intl: any) => any;
  getDefaults: (content: any, config: any) => any;
  toJsonLd: (formData: any) => any;
  fromJsonLd: (jsonLd: any) => any;
  availableFor: string[]; // Portal types this Rich Result is available for
  validate?: (formData: any, intl: any) => Record<string, string[]>; // Optional type-specific validation
}

/**
 * Register a single Rich Result type
 *
 * This is the extensibility API - other addons can import and use this
 * to register their own Rich Result types.
 *
 * @example
 * ```typescript
 * import { registerRichResultType } from '@interaktiv/volto-richresults/registry';
 *
 * const applyConfig = (config) => {
 *   config = registerRichResultType(config, {
 *     id: 'Event',
 *     title: 'Event',
 *     description: 'Event structured data',
 *     schema: EventSchema,
 *     getDefaults: getEventDefaults,
 *     toJsonLd: eventToJsonLd,
 *     fromJsonLd: jsonLdToEventForm,
 *     validate: validateEvent, // Optional type-specific validation
 *     availableFor: ['Event'],
 *   });
 *   return config;
 * };
 * ```
 */
export const registerRichResultType = (
  config: any,
  typeConfig: RichResultTypeConfig,
): any => {
  // Initialize richresults registry if it doesn't exist
  if (!config.settings.richresults) {
    config.settings = {
      ...config.settings,
      richresults: {
        types: {},
      },
    };
  }

  // Add or override the type
  config.settings.richresults.types[typeConfig.id] = typeConfig;

  return config;
};

/**
 * Helper to get available Rich Result types for a content type
 *
 * @param config - Volto config
 * @param portalType - Content type (e.g., "Document", "News Item")
 * @param selectableTypes - Optional configuration from registry (e.g., {"Document": ["Article"], ...})
 * @returns Array of available Rich Result type configurations
 */
export const getAvailableRichResultTypes = (
  config: any,
  portalType: string,
  selectableTypes?: Record<string, string[]>,
): RichResultTypeConfig[] => {
  const types = config.settings.richresults?.types || {};

  // If we have registry configuration, use it
  if (selectableTypes && selectableTypes[portalType]) {
    const allowedTypeIds = selectableTypes[portalType];
    return Object.values(types).filter((typeConfig: RichResultTypeConfig) =>
      allowedTypeIds.includes(typeConfig.id),
    );
  }

  // Fall back to hardcoded availableFor configuration
  return Object.values(types).filter(
    (typeConfig: RichResultTypeConfig) =>
      typeConfig.availableFor.includes('*') ||
      typeConfig.availableFor.includes(portalType),
  );
};

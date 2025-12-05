import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { registerRichResultType } from '../registry';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  dataset: {
    id: 'Dataset',
    defaultMessage: 'Dataset',
  },
  name: {
    id: 'Name',
    defaultMessage: 'Name',
  },
  nameDescription: {
    id: 'A descriptive name for the dataset',
    defaultMessage: 'A descriptive name for the dataset',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  descriptionDescription: {
    id: 'A brief summary of the dataset (50-5000 characters)',
    defaultMessage: 'A brief summary of the dataset (50-5000 characters)',
  },
  alternateName: {
    id: 'Alternate Name',
    defaultMessage: 'Alternate Name',
  },
  alternateNameDescription: {
    id: 'Other names or abbreviations the dataset is known by',
    defaultMessage: 'Other names or abbreviations the dataset is known by',
  },
  url: {
    id: 'URL',
    defaultMessage: 'URL',
  },
  urlDescription: {
    id: 'Landing page URL describing the dataset',
    defaultMessage: 'Landing page URL describing the dataset',
  },
  sameAs: {
    id: 'Same As',
    defaultMessage: 'Same As',
  },
  sameAsDescription: {
    id: 'Canonical URL establishing dataset identity',
    defaultMessage: 'Canonical URL establishing dataset identity',
  },
  identifier: {
    id: 'Identifier',
    defaultMessage: 'Identifier',
  },
  identifierDescription: {
    id: 'DOI or other persistent identifier (e.g., https://doi.org/10.1234/example)',
    defaultMessage:
      'DOI or other persistent identifier (e.g., https://doi.org/10.1234/example)',
  },
  keywords: {
    id: 'Keywords',
    defaultMessage: 'Keywords',
  },
  keywordsDescription: {
    id: 'Subject terms summarizing the dataset (comma-separated)',
    defaultMessage: 'Subject terms summarizing the dataset (comma-separated)',
  },
  license: {
    id: 'License',
    defaultMessage: 'License',
  },
  licenseDescription: {
    id: 'URL to the distribution license',
    defaultMessage: 'URL to the distribution license',
  },
  isAccessibleForFree: {
    id: 'Accessible for Free',
    defaultMessage: 'Accessible for Free',
  },
  isAccessibleForFreeDescription: {
    id: 'Whether the dataset is available without payment',
    defaultMessage: 'Whether the dataset is available without payment',
  },
  version: {
    id: 'Version',
    defaultMessage: 'Version',
  },
  versionDescription: {
    id: 'Version identifier or number',
    defaultMessage: 'Version identifier or number',
  },
  creator: {
    id: 'Creators',
    defaultMessage: 'Creators',
  },
  creatorDescription: {
    id: 'Authors or originators of the dataset',
    defaultMessage: 'Authors or originators of the dataset',
  },
  creatorName: {
    id: 'Name',
    defaultMessage: 'Name',
  },
  creatorUrl: {
    id: 'URL',
    defaultMessage: 'URL',
  },
  creatorType: {
    id: 'Type',
    defaultMessage: 'Type',
  },
  funder: {
    id: 'Funders',
    defaultMessage: 'Funders',
  },
  funderDescription: {
    id: 'Organizations providing financial support',
    defaultMessage: 'Organizations providing financial support',
  },
  funderName: {
    id: 'Name',
    defaultMessage: 'Name',
  },
  funderUrl: {
    id: 'URL',
    defaultMessage: 'URL',
  },
  distribution: {
    id: 'Distribution',
    defaultMessage: 'Distribution',
  },
  distributionDescription: {
    id: 'Download locations and formats for the dataset',
    defaultMessage: 'Download locations and formats for the dataset',
  },
  distributionContentUrl: {
    id: 'Download URL',
    defaultMessage: 'Download URL',
  },
  distributionEncodingFormat: {
    id: 'Format',
    defaultMessage: 'Format',
  },
  temporalCoverage: {
    id: 'Temporal Coverage',
    defaultMessage: 'Temporal Coverage',
  },
  temporalCoverageDescription: {
    id: 'Time period covered (ISO 8601 format, e.g., 2020-01-01/2023-12-31)',
    defaultMessage:
      'Time period covered (ISO 8601 format, e.g., 2020-01-01/2023-12-31)',
  },
  spatialCoverage: {
    id: 'Spatial Coverage',
    defaultMessage: 'Spatial Coverage',
  },
  spatialCoverageDescription: {
    id: 'Geographic area covered by the dataset',
    defaultMessage: 'Geographic area covered by the dataset',
  },
  measurementTechnique: {
    id: 'Measurement Technique',
    defaultMessage: 'Measurement Technique',
  },
  measurementTechniqueDescription: {
    id: 'Methodology or technology used in data collection',
    defaultMessage: 'Methodology or technology used in data collection',
  },
  variableMeasured: {
    id: 'Variables Measured',
    defaultMessage: 'Variables Measured',
  },
  variableMeasuredDescription: {
    id: 'Specific data variables or measurements (comma-separated)',
    defaultMessage: 'Specific data variables or measurements (comma-separated)',
  },
  includedInDataCatalog: {
    id: 'Data Catalog',
    defaultMessage: 'Data Catalog',
  },
  includedInDataCatalogDescription: {
    id: 'Name of the repository containing this dataset',
    defaultMessage: 'Name of the repository containing this dataset',
  },
  includedInDataCatalogUrl: {
    id: 'Data Catalog URL',
    defaultMessage: 'Data Catalog URL',
  },
  includedInDataCatalogUrlDescription: {
    id: 'URL of the data catalog',
    defaultMessage: 'URL of the data catalog',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  identificationFieldset: {
    id: 'Identification',
    defaultMessage: 'Identification',
  },
  creatorsFieldset: {
    id: 'Creators & Funders',
    defaultMessage: 'Creators & Funders',
  },
  distributionFieldset: {
    id: 'Distribution',
    defaultMessage: 'Distribution',
  },
  coverageFieldset: {
    id: 'Coverage',
    defaultMessage: 'Coverage',
  },
  personType: {
    id: 'Person',
    defaultMessage: 'Person',
  },
  organizationType: {
    id: 'Organization',
    defaultMessage: 'Organization',
  },
});

/**
 * Dataset Rich Result Schema
 *
 * Defines the form schema for Dataset structured data.
 * Based on schema.org Dataset type.
 * https://developers.google.com/search/docs/appearance/structured-data/dataset
 */
export const DatasetSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.dataset),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['name', 'description', 'keywords'],
    },
    {
      id: 'identification',
      title: intl.formatMessage(messages.identificationFieldset),
      fields: [
        'url',
        'sameAs',
        'identifier',
        'license',
        'isAccessibleForFree',
        'version',
      ],
    },
    {
      id: 'creators',
      title: intl.formatMessage(messages.creatorsFieldset),
      fields: ['creator', 'funder'],
    },
    {
      id: 'distribution',
      title: intl.formatMessage(messages.distributionFieldset),
      fields: [
        'distribution',
        'includedInDataCatalog',
        'includedInDataCatalogUrl',
      ],
    },
    {
      id: 'coverage',
      title: intl.formatMessage(messages.coverageFieldset),
      fields: [
        'temporalCoverage',
        'spatialCoverage',
        'measurementTechnique',
        'variableMeasured',
      ],
    },
  ],
  properties: {
    name: {
      title: intl.formatMessage(messages.name),
      description: intl.formatMessage(messages.nameDescription),
      type: 'string',
    },
    description: {
      title: intl.formatMessage(messages.description),
      description: intl.formatMessage(messages.descriptionDescription),
      type: 'string',
      widget: 'textarea',
      minLength: 50,
      maxLength: 5000,
    },
    keywords: {
      title: intl.formatMessage(messages.keywords),
      description: intl.formatMessage(messages.keywordsDescription),
      type: 'string',
    },
    url: {
      title: intl.formatMessage(messages.url),
      description: intl.formatMessage(messages.urlDescription),
      type: 'string',
      widget: 'url',
    },
    sameAs: {
      title: intl.formatMessage(messages.sameAs),
      description: intl.formatMessage(messages.sameAsDescription),
      type: 'string',
      widget: 'url',
    },
    identifier: {
      title: intl.formatMessage(messages.identifier),
      description: intl.formatMessage(messages.identifierDescription),
      type: 'string',
    },
    license: {
      title: intl.formatMessage(messages.license),
      description: intl.formatMessage(messages.licenseDescription),
      type: 'string',
      widget: 'url',
    },
    isAccessibleForFree: {
      title: intl.formatMessage(messages.isAccessibleForFree),
      description: intl.formatMessage(messages.isAccessibleForFreeDescription),
      type: 'boolean',
    },
    version: {
      title: intl.formatMessage(messages.version),
      description: intl.formatMessage(messages.versionDescription),
      type: 'string',
    },
    creator: {
      title: intl.formatMessage(messages.creator),
      description: intl.formatMessage(messages.creatorDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.creator),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['type', 'name', 'url'],
          },
        ],
        properties: {
          type: {
            title: intl.formatMessage(messages.creatorType),
            choices: [
              ['Person', intl.formatMessage(messages.personType)],
              ['Organization', intl.formatMessage(messages.organizationType)],
            ],
            default: 'Person',
          },
          name: {
            title: intl.formatMessage(messages.creatorName),
            type: 'string',
          },
          url: {
            title: intl.formatMessage(messages.creatorUrl),
            type: 'string',
            widget: 'url',
          },
        },
        required: ['name'],
      },
    },
    funder: {
      title: intl.formatMessage(messages.funder),
      description: intl.formatMessage(messages.funderDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.funder),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name', 'url'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.funderName),
            type: 'string',
          },
          url: {
            title: intl.formatMessage(messages.funderUrl),
            type: 'string',
            widget: 'url',
          },
        },
        required: ['name'],
      },
    },
    distribution: {
      title: intl.formatMessage(messages.distribution),
      description: intl.formatMessage(messages.distributionDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.distribution),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['contentUrl', 'encodingFormat'],
          },
        ],
        properties: {
          contentUrl: {
            title: intl.formatMessage(messages.distributionContentUrl),
            type: 'string',
            widget: 'url',
          },
          encodingFormat: {
            title: intl.formatMessage(messages.distributionEncodingFormat),
            type: 'string',
          },
        },
        required: ['contentUrl'],
      },
    },
    includedInDataCatalog: {
      title: intl.formatMessage(messages.includedInDataCatalog),
      description: intl.formatMessage(
        messages.includedInDataCatalogDescription,
      ),
      type: 'string',
    },
    includedInDataCatalogUrl: {
      title: intl.formatMessage(messages.includedInDataCatalogUrl),
      description: intl.formatMessage(
        messages.includedInDataCatalogUrlDescription,
      ),
      type: 'string',
      widget: 'url',
    },
    temporalCoverage: {
      title: intl.formatMessage(messages.temporalCoverage),
      description: intl.formatMessage(messages.temporalCoverageDescription),
      type: 'string',
    },
    spatialCoverage: {
      title: intl.formatMessage(messages.spatialCoverage),
      description: intl.formatMessage(messages.spatialCoverageDescription),
      type: 'string',
    },
    measurementTechnique: {
      title: intl.formatMessage(messages.measurementTechnique),
      description: intl.formatMessage(messages.measurementTechniqueDescription),
      type: 'string',
    },
    variableMeasured: {
      title: intl.formatMessage(messages.variableMeasured),
      description: intl.formatMessage(messages.variableMeasuredDescription),
      type: 'string',
    },
  },
  required: ['name', 'description'],
});

/**
 * Get default values for Dataset from content
 *
 * Extracts relevant data from the current content object
 * to pre-populate the Dataset form.
 */
export const getDatasetDefaults = (content: any, config: any) => {
  return {
    name: content.title || '',
    description: content.description || '',
    keywords: '',
    url: content['@id'] || '',
    sameAs: '',
    identifier: '',
    license: '',
    isAccessibleForFree: true,
    version: '',
    creator: [],
    funder: [],
    distribution: [],
    includedInDataCatalog: '',
    includedInDataCatalogUrl: '',
    temporalCoverage: '',
    spatialCoverage: '',
    measurementTechnique: '',
    variableMeasured: '',
  };
};

/**
 * Convert form data to JSON-LD
 *
 * Transforms the form data structure into schema.org
 * compliant JSON-LD format.
 */
export const datasetToJsonLd = (formData: any) => {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: formData.name,
    description: formData.description,
  };

  // Add optional string fields
  if (formData.keywords) {
    // Convert comma-separated string to array
    jsonLd.keywords = formData.keywords
      .split(',')
      .map((k: string) => k.trim())
      .filter((k: string) => k);
  }

  if (formData.url) {
    jsonLd.url = formData.url;
  }

  if (formData.sameAs) {
    jsonLd.sameAs = formData.sameAs;
  }

  if (formData.identifier) {
    jsonLd.identifier = formData.identifier;
  }

  if (formData.license) {
    jsonLd.license = formData.license;
  }

  if (formData.isAccessibleForFree !== undefined) {
    jsonLd.isAccessibleForFree = formData.isAccessibleForFree;
  }

  if (formData.version) {
    jsonLd.version = formData.version;
  }

  if (formData.temporalCoverage) {
    jsonLd.temporalCoverage = formData.temporalCoverage;
  }

  if (formData.spatialCoverage) {
    jsonLd.spatialCoverage = formData.spatialCoverage;
  }

  if (formData.measurementTechnique) {
    jsonLd.measurementTechnique = formData.measurementTechnique;
  }

  if (formData.variableMeasured) {
    // Convert comma-separated string to array
    jsonLd.variableMeasured = formData.variableMeasured
      .split(',')
      .map((v: string) => v.trim())
      .filter((v: string) => v);
  }

  // Add creator array
  if (formData.creator && formData.creator.length > 0) {
    jsonLd.creator = formData.creator
      .filter((item: any) => item && item.name)
      .map((item: any) => {
        const creator: any = {
          '@type': item.type || 'Person',
          name: item.name,
        };
        if (item.url) {
          creator.url = item.url;
        }
        return creator;
      });

    if (jsonLd.creator.length === 0) {
      delete jsonLd.creator;
    }
  }

  // Add funder array
  if (formData.funder && formData.funder.length > 0) {
    jsonLd.funder = formData.funder
      .filter((item: any) => item && item.name)
      .map((item: any) => {
        const funder: any = {
          '@type': 'Organization',
          name: item.name,
        };
        if (item.url) {
          funder.url = item.url;
        }
        return funder;
      });

    if (jsonLd.funder.length === 0) {
      delete jsonLd.funder;
    }
  }

  // Add distribution array
  if (formData.distribution && formData.distribution.length > 0) {
    jsonLd.distribution = formData.distribution
      .filter((item: any) => item && item.contentUrl)
      .map((item: any) => {
        const dist: any = {
          '@type': 'DataDownload',
          contentUrl: item.contentUrl,
        };
        if (item.encodingFormat) {
          dist.encodingFormat = item.encodingFormat;
        }
        return dist;
      });

    if (jsonLd.distribution.length === 0) {
      delete jsonLd.distribution;
    }
  }

  // Add includedInDataCatalog
  if (formData.includedInDataCatalog || formData.includedInDataCatalogUrl) {
    jsonLd.includedInDataCatalog = {
      '@type': 'DataCatalog',
    };
    if (formData.includedInDataCatalog) {
      jsonLd.includedInDataCatalog.name = formData.includedInDataCatalog;
    }
    if (formData.includedInDataCatalogUrl) {
      jsonLd.includedInDataCatalog.url = formData.includedInDataCatalogUrl;
    }
  }

  return jsonLd;
};

/**
 * Convert JSON-LD back to form data
 *
 * Transforms JSON-LD structure back into form-editable format
 * for editing existing Rich Results.
 */
export const jsonLdToDatasetForm = (jsonLd: any) => {
  // Convert keywords array to comma-separated string
  let keywords = '';
  if (jsonLd.keywords) {
    keywords = Array.isArray(jsonLd.keywords)
      ? jsonLd.keywords.join(', ')
      : jsonLd.keywords;
  }

  // Convert variableMeasured array to comma-separated string
  let variableMeasured = '';
  if (jsonLd.variableMeasured) {
    variableMeasured = Array.isArray(jsonLd.variableMeasured)
      ? jsonLd.variableMeasured.join(', ')
      : jsonLd.variableMeasured;
  }

  // Convert creator to object_list format
  let creator: any[] = [];
  if (jsonLd.creator) {
    const creators = Array.isArray(jsonLd.creator)
      ? jsonLd.creator
      : [jsonLd.creator];
    creator = creators
      .filter((item: any) => item && item.name)
      .map((item: any) => ({
        '@id': uuid(),
        type: item['@type'] || 'Person',
        name: item.name || '',
        url: item.url || '',
      }));
  }

  // Convert funder to object_list format
  let funder: any[] = [];
  if (jsonLd.funder) {
    const funders = Array.isArray(jsonLd.funder)
      ? jsonLd.funder
      : [jsonLd.funder];
    funder = funders
      .filter((item: any) => item && item.name)
      .map((item: any) => ({
        '@id': uuid(),
        name: item.name || '',
        url: item.url || '',
      }));
  }

  // Convert distribution to object_list format
  let distribution: any[] = [];
  if (jsonLd.distribution) {
    const distributions = Array.isArray(jsonLd.distribution)
      ? jsonLd.distribution
      : [jsonLd.distribution];
    distribution = distributions
      .filter((item: any) => item && item.contentUrl)
      .map((item: any) => ({
        '@id': uuid(),
        contentUrl: item.contentUrl || '',
        encodingFormat: item.encodingFormat || '',
      }));
  }

  // Extract includedInDataCatalog fields
  let includedInDataCatalog = '';
  let includedInDataCatalogUrl = '';
  if (jsonLd.includedInDataCatalog) {
    includedInDataCatalog = jsonLd.includedInDataCatalog.name || '';
    includedInDataCatalogUrl = jsonLd.includedInDataCatalog.url || '';
  }

  return {
    name: jsonLd.name || '',
    description: jsonLd.description || '',
    keywords,
    url: jsonLd.url || '',
    sameAs: jsonLd.sameAs || '',
    identifier: jsonLd.identifier || '',
    license: jsonLd.license || '',
    isAccessibleForFree:
      jsonLd.isAccessibleForFree !== undefined
        ? jsonLd.isAccessibleForFree
        : true,
    version: jsonLd.version || '',
    creator,
    funder,
    distribution,
    includedInDataCatalog,
    includedInDataCatalogUrl,
    temporalCoverage: jsonLd.temporalCoverage || '',
    spatialCoverage: jsonLd.spatialCoverage || '',
    measurementTechnique: jsonLd.measurementTechnique || '',
    variableMeasured,
  };
};

/**
 * Register Dataset Rich Result type
 *
 * This registers the type for volto-richresults.
 */
export const registerDatasetRichResultType = (config: any) => {
  config = registerRichResultType(config, {
    id: 'Dataset',
    title: 'Dataset',
    description:
      'Structured data for datasets, enabling discovery in Google Dataset Search',
    schema: DatasetSchema,
    getDefaults: getDatasetDefaults,
    toJsonLd: datasetToJsonLd,
    fromJsonLd: jsonLdToDatasetForm,
    availableFor: ['*'], // Available for all content types
  });

  return config;
};

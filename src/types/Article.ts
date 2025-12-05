import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import type { ConfigType } from '@plone/registry';
import { registerRichResultType } from '../registry';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  article: {
    id: 'Article',
    defaultMessage: 'Article',
  },
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  headlineDescription: {
    id: 'The headline of the article (max 110 characters recommended)',
    defaultMessage:
      'The headline of the article (max 110 characters recommended)',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  descriptionDescription: {
    id: 'A short description of the article',
    defaultMessage: 'A short description of the article',
  },
  image: {
    id: 'Images',
    defaultMessage: 'Images',
  },
  imageDescription: {
    id: 'Representative images for the article',
    defaultMessage: 'Representative images for the article',
  },
  imageUrl: {
    id: 'Image URL',
    defaultMessage: 'Image URL',
  },
  datePublished: {
    id: 'Date Published',
    defaultMessage: 'Date Published',
  },
  dateModified: {
    id: 'Date Modified',
    defaultMessage: 'Date Modified',
  },
  author: {
    id: 'Authors',
    defaultMessage: 'Authors',
  },
  authorName: {
    id: 'Name',
    defaultMessage: 'Name',
  },
  authorUrl: {
    id: 'URL',
    defaultMessage: 'URL',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  datesFieldset: {
    id: 'Dates',
    defaultMessage: 'Dates',
  },
  authorsFieldset: {
    id: 'Authors',
    defaultMessage: 'Authors',
  },
});

/**
 * Article Rich Result Schema
 *
 * Defines the form schema for Article structured data.
 * Based on schema.org Article type.
 */
export const ArticleSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.article),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['headline', 'description', 'image'],
    },
    {
      id: 'dates',
      title: intl.formatMessage(messages.datesFieldset),
      fields: ['datePublished', 'dateModified'],
    },
    {
      id: 'authors',
      title: intl.formatMessage(messages.authorsFieldset),
      fields: ['author'],
    },
  ],
  properties: {
    headline: {
      title: intl.formatMessage(messages.headline),
      description: intl.formatMessage(messages.headlineDescription),
      type: 'string',
    },
    description: {
      title: intl.formatMessage(messages.description),
      description: intl.formatMessage(messages.descriptionDescription),
      widget: 'textarea',
    },
    image: {
      title: intl.formatMessage(messages.image),
      description: intl.formatMessage(messages.imageDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.image),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['url'],
          },
        ],
        properties: {
          url: {
            title: intl.formatMessage(messages.imageUrl),
            type: 'url',
            widget: 'image_url',
          },
        },
        required: ['url'],
      },
    },
    datePublished: {
      title: intl.formatMessage(messages.datePublished),
      widget: 'datetime',
    },
    dateModified: {
      title: intl.formatMessage(messages.dateModified),
      widget: 'datetime',
    },
    author: {
      title: intl.formatMessage(messages.author),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.author),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name', 'url'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.authorName),
            type: 'string',
          },
          url: {
            title: intl.formatMessage(messages.authorUrl),
            type: 'url',
            widget: 'url',
          },
        },
        required: ['name'],
      },
    },
  },
  required: ['headline', 'datePublished'],
});

/**
 * Get default values for Article from content
 *
 * Extracts relevant data from the current content object
 * to pre-populate the Article form.
 */
export const getArticleDefaults = (content: any, config: any) => {
  return {
    headline: content.title || '',
    description: content.description || '',
    image: [],
    datePublished: content.created || new Date().toISOString(),
    dateModified: content.modified || new Date().toISOString(),
    author: [],
  };
};

/**
 * Convert form data to JSON-LD
 *
 * Transforms the form data structure into schema.org
 * compliant JSON-LD format.
 */
export const articleToJsonLd = (formData: any) => {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: formData.headline,
  };

  // Add optional fields only if they have values
  if (formData.description) {
    jsonLd.description = formData.description;
  }

  if (formData.image && formData.image.length > 0) {
    // Extract URLs from object_list format [{url: "..."}, ...]
    jsonLd.image = formData.image
      .filter((item: any) => item && item.url) // Only include items with URL
      .map((item: any) => item.url);
  }

  if (formData.datePublished) {
    jsonLd.datePublished = formData.datePublished;
  }

  if (formData.dateModified) {
    jsonLd.dateModified = formData.dateModified;
  }

  if (formData.author && formData.author.length > 0) {
    // Filter out empty entries and map to JSON-LD Person objects
    jsonLd.author = formData.author
      .filter((person: any) => person && person.name) // Only include if has a name
      .map((person: any) => {
        const author: any = {
          '@type': 'Person',
          name: person.name,
        };
        if (person.url) {
          author.url = person.url;
        }
        return author;
      });

    // Don't include empty author array
    if (jsonLd.author.length === 0) {
      delete jsonLd.author;
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
export const jsonLdToArticleForm = (jsonLd: any) => {
  const formData = {
    headline: jsonLd.headline || '',
    description: jsonLd.description || '',
    // Convert image URLs to object_list format (JSON-LD allows single value or array)
    image: jsonLd.image
      ? (Array.isArray(jsonLd.image) ? jsonLd.image : [jsonLd.image]).map(
          (url: string) => ({
            '@id': uuid(), // Add @id for object_list widget tracking
            url: url,
          }),
        )
      : [],
    datePublished: jsonLd.datePublished || '',
    dateModified: jsonLd.dateModified || '',
    // Convert author to object_list format (JSON-LD allows single value or array)
    author: jsonLd.author
      ? (Array.isArray(jsonLd.author) ? jsonLd.author : [jsonLd.author])
          .filter((person: any) => person && person.name) // Filter out empty entries
          .map((person: any) => ({
            '@id': uuid(), // Add @id for object_list widget tracking
            name: person.name || '',
            url: person.url || '',
          }))
      : [],
  };

  return formData;
};

/**
 * Register Article Rich Result type
 *
 * This registers the type for volto-richresults.
 */
export const registerArticleRichResultType = (config: ConfigType) => {
  config = registerRichResultType(config, {
    id: 'Article',
    title: 'Article',
    description: 'Generic article structured data for improved SEO',
    schema: ArticleSchema,
    getDefaults: getArticleDefaults,
    toJsonLd: articleToJsonLd,
    fromJsonLd: jsonLdToArticleForm,
    availableFor: ['*'], // Available for all content types
  });

  return config;
};

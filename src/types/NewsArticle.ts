import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { registerRichResultType } from '../registry';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  newsArticle: {
    id: 'News Article',
    defaultMessage: 'News Article',
  },
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  headlineDescription: {
    id: 'The headline of the news article (max 110 characters recommended)',
    defaultMessage:
      'The headline of the news article (max 110 characters recommended)',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  descriptionDescription: {
    id: 'A short description of the news article',
    defaultMessage: 'A short description of the news article',
  },
  image: {
    id: 'Images',
    defaultMessage: 'Images',
  },
  imageDescription: {
    id: 'Representative images for the news article',
    defaultMessage: 'Representative images for the news article',
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
  authorType: {
    id: 'Author Type',
    defaultMessage: 'Author Type',
  },
  person: {
    id: 'Person',
    defaultMessage: 'Person',
  },
  organization: {
    id: 'Organization',
    defaultMessage: 'Organization',
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
 * NewsArticle Rich Result Schema
 *
 * Defines the form schema for NewsArticle structured data.
 * Based on schema.org NewsArticle type.
 *
 * NewsArticle is a subtype of Article specifically for news content.
 * It shares the same properties as Article but indicates the content is news.
 */
export const NewsArticleSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.newsArticle),
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
            fields: ['type', 'name', 'url'],
          },
        ],
        properties: {
          type: {
            title: intl.formatMessage(messages.authorType),
            type: 'string',
            choices: [
              ['Person', intl.formatMessage(messages.person)],
              ['Organization', intl.formatMessage(messages.organization)],
            ],
            default: 'Person',
          },
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
 * Get default values for NewsArticle from content
 *
 * Extracts relevant data from the current content object
 * to pre-populate the NewsArticle form.
 */
export const getNewsArticleDefaults = (content: any, config: any) => {
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
export const newsArticleToJsonLd = (formData: any) => {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
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
    // Filter out empty entries and map to JSON-LD Person/Organization objects
    jsonLd.author = formData.author
      .filter((author: any) => author && author.name) // Only include if has a name
      .map((author: any) => {
        const authorObj: any = {
          '@type': author.type || 'Person',
          name: author.name,
        };
        if (author.url) {
          authorObj.url = author.url;
        }
        return authorObj;
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
export const jsonLdToNewsArticleForm = (jsonLd: any) => {
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
          .filter((author: any) => author && author.name) // Filter out empty entries
          .map((author: any) => ({
            '@id': uuid(), // Add @id for object_list widget tracking
            type: author['@type'] || 'Person',
            name: author.name || '',
            url: author.url || '',
          }))
      : [],
  };

  return formData;
};

/**
 * Register NewsArticle Rich Result type
 *
 * This registers the type for volto-richresults.
 */
export const registerNewsArticleRichResultType = (config: any) => {
  config = registerRichResultType(config, {
    id: 'NewsArticle',
    title: 'News Article',
    description: 'News article structured data for news content',
    schema: NewsArticleSchema,
    getDefaults: getNewsArticleDefaults,
    toJsonLd: newsArticleToJsonLd,
    fromJsonLd: jsonLdToNewsArticleForm,
    availableFor: ['*'], // Available for all content types
  });

  return config;
};

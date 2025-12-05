import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { registerRichResultType } from '../registry';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  webPage: {
    id: 'Web Page',
    defaultMessage: 'Web Page',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  datesFieldset: {
    id: 'Dates',
    defaultMessage: 'Dates',
  },
  authorshipFieldset: {
    id: 'Authorship',
    defaultMessage: 'Authorship',
  },
  additionalFieldset: {
    id: 'Additional Information',
    defaultMessage: 'Additional Information',
  },
  name: {
    id: 'Page Name',
    defaultMessage: 'Page Name',
  },
  nameDescription: {
    id: 'The name or title of the web page',
    defaultMessage: 'The name or title of the web page',
  },
  description: {
    id: 'Page Description',
    defaultMessage: 'Page Description',
  },
  descriptionDescription: {
    id: 'A short description of the web page',
    defaultMessage: 'A short description of the web page',
  },
  url: {
    id: 'Page URL',
    defaultMessage: 'Page URL',
  },
  urlDescription: {
    id: 'The canonical URL of this web page',
    defaultMessage: 'The canonical URL of this web page',
  },
  image: {
    id: 'Page Image',
    defaultMessage: 'Page Image',
  },
  imageDescription: {
    id: 'URL of an image representing the page',
    defaultMessage: 'URL of an image representing the page',
  },
  inLanguage: {
    id: 'Language',
    defaultMessage: 'Language',
  },
  inLanguageDescription: {
    id: 'Language of the page content (e.g., en, de, fr)',
    defaultMessage: 'Language of the page content (e.g., en, de, fr)',
  },
  datePublished: {
    id: 'Date Published',
    defaultMessage: 'Date Published',
  },
  datePublishedDescription: {
    id: 'When this page was first published',
    defaultMessage: 'When this page was first published',
  },
  dateModified: {
    id: 'Date Modified',
    defaultMessage: 'Date Modified',
  },
  dateModifiedDescription: {
    id: 'When this page was last modified',
    defaultMessage: 'When this page was last modified',
  },
  author: {
    id: 'Authors',
    defaultMessage: 'Authors',
  },
  authorDescription: {
    id: 'The author(s) of this web page',
    defaultMessage: 'The author(s) of this web page',
  },
  authorName: {
    id: 'Author Name',
    defaultMessage: 'Author Name',
  },
  authorUrl: {
    id: 'Author URL',
    defaultMessage: 'Author URL',
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
  publisher: {
    id: 'Publisher',
    defaultMessage: 'Publisher',
  },
  publisherDescription: {
    id: 'The organization publishing this page',
    defaultMessage: 'The organization publishing this page',
  },
  publisherName: {
    id: 'Publisher Name',
    defaultMessage: 'Publisher Name',
  },
  publisherUrl: {
    id: 'Publisher URL',
    defaultMessage: 'Publisher URL',
  },
  publisherLogo: {
    id: 'Publisher Logo URL',
    defaultMessage: 'Publisher Logo URL',
  },
  keywords: {
    id: 'Keywords',
    defaultMessage: 'Keywords',
  },
  keywordsDescription: {
    id: 'Keywords describing the page content (comma-separated)',
    defaultMessage: 'Keywords describing the page content (comma-separated)',
  },
  isPartOf: {
    id: 'Part Of',
    defaultMessage: 'Part Of',
  },
  isPartOfDescription: {
    id: 'The website this page belongs to',
    defaultMessage: 'The website this page belongs to',
  },
  isPartOfName: {
    id: 'Website Name',
    defaultMessage: 'Website Name',
  },
  isPartOfUrl: {
    id: 'Website URL',
    defaultMessage: 'Website URL',
  },
  about: {
    id: 'About',
    defaultMessage: 'About',
  },
  aboutDescription: {
    id: 'The primary topic or subject of this page',
    defaultMessage: 'The primary topic or subject of this page',
  },
  mentions: {
    id: 'Mentions',
    defaultMessage: 'Mentions',
  },
  mentionsDescription: {
    id: 'Topics or entities mentioned on this page (comma-separated)',
    defaultMessage:
      'Topics or entities mentioned on this page (comma-separated)',
  },
  copyrightHolder: {
    id: 'Copyright Holder',
    defaultMessage: 'Copyright Holder',
  },
  copyrightHolderDescription: {
    id: 'The party holding the copyright',
    defaultMessage: 'The party holding the copyright',
  },
  copyrightYear: {
    id: 'Copyright Year',
    defaultMessage: 'Copyright Year',
  },
  copyrightYearDescription: {
    id: 'The year the copyright was established',
    defaultMessage: 'The year the copyright was established',
  },
});

/**
 * WebPage Rich Result Schema
 *
 * Defines the form schema for WebPage structured data.
 * Based on schema.org WebPage type.
 *
 * Note: WebPage is a valid schema.org type but is NOT currently
 * supported by Google for rich results. The structured data is still
 * valid and may be used by other search engines or services.
 */
export const WebPageSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.webPage),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['name', 'description', 'url', 'image', 'inLanguage', 'keywords'],
    },
    {
      id: 'dates',
      title: intl.formatMessage(messages.datesFieldset),
      fields: ['datePublished', 'dateModified'],
    },
    {
      id: 'authorship',
      title: intl.formatMessage(messages.authorshipFieldset),
      fields: ['author', 'publisher'],
    },
    {
      id: 'additional',
      title: intl.formatMessage(messages.additionalFieldset),
      fields: [
        'isPartOf',
        'about',
        'mentions',
        'copyrightHolder',
        'copyrightYear',
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
      widget: 'textarea',
    },
    url: {
      title: intl.formatMessage(messages.url),
      description: intl.formatMessage(messages.urlDescription),
      type: 'string',
      widget: 'url',
    },
    image: {
      title: intl.formatMessage(messages.image),
      description: intl.formatMessage(messages.imageDescription),
      type: 'url',
      widget: 'image_url',
    },
    inLanguage: {
      title: intl.formatMessage(messages.inLanguage),
      description: intl.formatMessage(messages.inLanguageDescription),
      type: 'string',
    },
    keywords: {
      title: intl.formatMessage(messages.keywords),
      description: intl.formatMessage(messages.keywordsDescription),
      type: 'string',
    },
    datePublished: {
      title: intl.formatMessage(messages.datePublished),
      description: intl.formatMessage(messages.datePublishedDescription),
      widget: 'datetime',
    },
    dateModified: {
      title: intl.formatMessage(messages.dateModified),
      description: intl.formatMessage(messages.dateModifiedDescription),
      widget: 'datetime',
    },
    author: {
      title: intl.formatMessage(messages.author),
      description: intl.formatMessage(messages.authorDescription),
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
            type: 'string',
            widget: 'url',
          },
        },
        required: ['name'],
      },
    },
    publisher: {
      title: intl.formatMessage(messages.publisher),
      description: intl.formatMessage(messages.publisherDescription),
      widget: 'object',
      schema: {
        title: intl.formatMessage(messages.publisher),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name', 'url', 'logo'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.publisherName),
            type: 'string',
          },
          url: {
            title: intl.formatMessage(messages.publisherUrl),
            type: 'string',
            widget: 'url',
          },
          logo: {
            title: intl.formatMessage(messages.publisherLogo),
            type: 'url',
            widget: 'image_url',
          },
        },
        required: [],
      },
    },
    isPartOf: {
      title: intl.formatMessage(messages.isPartOf),
      description: intl.formatMessage(messages.isPartOfDescription),
      widget: 'object',
      schema: {
        title: intl.formatMessage(messages.isPartOf),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name', 'url'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.isPartOfName),
            type: 'string',
          },
          url: {
            title: intl.formatMessage(messages.isPartOfUrl),
            type: 'string',
            widget: 'url',
          },
        },
        required: [],
      },
    },
    about: {
      title: intl.formatMessage(messages.about),
      description: intl.formatMessage(messages.aboutDescription),
      type: 'string',
    },
    mentions: {
      title: intl.formatMessage(messages.mentions),
      description: intl.formatMessage(messages.mentionsDescription),
      type: 'string',
    },
    copyrightHolder: {
      title: intl.formatMessage(messages.copyrightHolder),
      description: intl.formatMessage(messages.copyrightHolderDescription),
      type: 'string',
    },
    copyrightYear: {
      title: intl.formatMessage(messages.copyrightYear),
      description: intl.formatMessage(messages.copyrightYearDescription),
      type: 'string',
    },
  },
  required: ['name'],
});

/**
 * Get default values for WebPage from content
 *
 * Extracts relevant data from the current content object
 * to pre-populate the WebPage form.
 */
export const getWebPageDefaults = (content: any, config: any) => {
  const defaults: any = {
    name: content.title || '',
    description: content.description || '',
    url: content['@id'] || '',
    keywords: content.Subject?.join(', ') || '',
    author: [],
    publisher: {
      name: '',
      url: '',
      logo: '',
    },
    isPartOf: {
      name: '',
      url: '',
    },
  };

  // Extract dates
  if (content.created) {
    defaults.datePublished = content.created;
  }
  if (content.modified) {
    defaults.dateModified = content.modified;
  }

  // Extract language
  if (content.language?.token) {
    defaults.inLanguage = content.language.token;
  }

  return defaults;
};

/**
 * Convert form data to JSON-LD
 *
 * Transforms the form data structure into schema.org
 * compliant JSON-LD format for WebPage.
 */
export const webPageToJsonLd = (formData: any) => {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: formData.name,
  };

  if (formData.description) {
    jsonLd.description = formData.description;
  }

  if (formData.url) {
    jsonLd.url = formData.url;
  }

  if (formData.image) {
    jsonLd.image = formData.image;
  }

  if (formData.inLanguage) {
    jsonLd.inLanguage = formData.inLanguage;
  }

  if (formData.keywords) {
    // Convert comma-separated string to array
    jsonLd.keywords = formData.keywords
      .split(',')
      .map((k: string) => k.trim())
      .filter((k: string) => k);
  }

  if (formData.datePublished) {
    jsonLd.datePublished = formData.datePublished;
  }

  if (formData.dateModified) {
    jsonLd.dateModified = formData.dateModified;
  }

  // Authors
  if (formData.author && formData.author.length > 0) {
    jsonLd.author = formData.author
      .filter((a: any) => a && a.name)
      .map((a: any) => {
        const author: any = {
          '@type': a.type || 'Person',
          name: a.name,
        };
        if (a.url) {
          author.url = a.url;
        }
        return author;
      });

    if (jsonLd.author.length === 0) {
      delete jsonLd.author;
    } else if (jsonLd.author.length === 1) {
      jsonLd.author = jsonLd.author[0];
    }
  }

  // Publisher
  if (formData.publisher?.name) {
    jsonLd.publisher = {
      '@type': 'Organization',
      name: formData.publisher.name,
    };
    if (formData.publisher.url) {
      jsonLd.publisher.url = formData.publisher.url;
    }
    if (formData.publisher.logo) {
      jsonLd.publisher.logo = {
        '@type': 'ImageObject',
        url: formData.publisher.logo,
      };
    }
  }

  // isPartOf (WebSite)
  if (formData.isPartOf?.name || formData.isPartOf?.url) {
    jsonLd.isPartOf = {
      '@type': 'WebSite',
    };
    if (formData.isPartOf.name) {
      jsonLd.isPartOf.name = formData.isPartOf.name;
    }
    if (formData.isPartOf.url) {
      jsonLd.isPartOf.url = formData.isPartOf.url;
    }
  }

  if (formData.about) {
    jsonLd.about = formData.about;
  }

  if (formData.mentions) {
    // Convert comma-separated string to array
    jsonLd.mentions = formData.mentions
      .split(',')
      .map((m: string) => m.trim())
      .filter((m: string) => m);
  }

  if (formData.copyrightHolder) {
    jsonLd.copyrightHolder = {
      '@type': 'Organization',
      name: formData.copyrightHolder,
    };
  }

  if (formData.copyrightYear) {
    jsonLd.copyrightYear = formData.copyrightYear;
  }

  return jsonLd;
};

/**
 * Convert JSON-LD back to form data
 *
 * Transforms JSON-LD structure back into form-editable format
 * for editing existing Rich Results.
 */
export const jsonLdToWebPageForm = (jsonLd: any) => {
  const formData: any = {
    name: jsonLd.name || '',
    description: jsonLd.description || '',
    url: jsonLd.url || '',
    image: jsonLd.image || '',
    inLanguage: jsonLd.inLanguage || '',
    keywords: Array.isArray(jsonLd.keywords)
      ? jsonLd.keywords.join(', ')
      : jsonLd.keywords || '',
    datePublished: jsonLd.datePublished || '',
    dateModified: jsonLd.dateModified || '',
    author: [],
    publisher: {
      name: '',
      url: '',
      logo: '',
    },
    isPartOf: {
      name: '',
      url: '',
    },
    about: jsonLd.about || '',
    mentions: Array.isArray(jsonLd.mentions)
      ? jsonLd.mentions.join(', ')
      : jsonLd.mentions || '',
    copyrightHolder:
      typeof jsonLd.copyrightHolder === 'object'
        ? jsonLd.copyrightHolder.name || ''
        : jsonLd.copyrightHolder || '',
    copyrightYear: jsonLd.copyrightYear || '',
  };

  // Authors
  if (jsonLd.author) {
    const authors = Array.isArray(jsonLd.author)
      ? jsonLd.author
      : [jsonLd.author];
    formData.author = authors
      .filter((a: any) => a && (a.name || typeof a === 'string'))
      .map((a: any) => ({
        '@id': uuid(),
        type: a['@type'] || 'Person',
        name: typeof a === 'string' ? a : a.name || '',
        url: typeof a === 'string' ? '' : a.url || '',
      }));
  }

  // Publisher
  if (jsonLd.publisher) {
    formData.publisher = {
      name: jsonLd.publisher.name || '',
      url: jsonLd.publisher.url || '',
      logo:
        typeof jsonLd.publisher.logo === 'object'
          ? jsonLd.publisher.logo.url || ''
          : jsonLd.publisher.logo || '',
    };
  }

  // isPartOf
  if (jsonLd.isPartOf) {
    formData.isPartOf = {
      name: jsonLd.isPartOf.name || '',
      url: jsonLd.isPartOf.url || '',
    };
  }

  return formData;
};

/**
 * Register WebPage Rich Result type
 *
 * This registers the type for volto-richresults.
 *
 * Note: WebPage is a valid schema.org type but is NOT currently
 * supported by Google for rich results. The structured data is still
 * valid and may be used by other search engines or services.
 */
export const registerWebPageRichResultType = (config: any) => {
  config = registerRichResultType(config, {
    id: 'WebPage',
    title: 'Web Page',
    description:
      'Generic web page structured data with authorship and publishing info (schema.org type, not Google rich result)',
    schema: WebPageSchema,
    getDefaults: getWebPageDefaults,
    toJsonLd: webPageToJsonLd,
    fromJsonLd: jsonLdToWebPageForm,
    availableFor: ['*'], // Available for all content types
  });

  return config;
};

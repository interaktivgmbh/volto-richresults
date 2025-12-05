import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import type { ConfigType } from '@plone/registry';
import { registerRichResultType } from '../registry';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  faqPage: {
    id: 'FAQ Page',
    defaultMessage: 'FAQ Page',
  },
  questions: {
    id: 'Questions',
    defaultMessage: 'Questions',
  },
  questionsDescription: {
    id: 'List of frequently asked questions with answers',
    defaultMessage: 'List of frequently asked questions with answers',
  },
  question: {
    id: 'Question',
    defaultMessage: 'Question',
  },
  questionDescription: {
    id: 'The full text of the question',
    defaultMessage: 'The full text of the question',
  },
  answer: {
    id: 'Answer',
    defaultMessage: 'Answer',
  },
  answerDescription: {
    id: 'The full answer to the question (HTML allowed)',
    defaultMessage: 'The full answer to the question (HTML allowed)',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
});

/**
 * FAQPage Rich Result Schema
 *
 * Defines the form schema for FAQPage structured data.
 * Based on schema.org FAQPage type.
 *
 * Google supports the following HTML tags in answers:
 * <h1> through <h6>, <br>, <ol>, <ul>, <li>, <a>, <p>, <div>, <b>, <strong>, <i>, and <em>
 */
export const FAQPageSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.faqPage),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['questions'],
    },
  ],
  properties: {
    questions: {
      title: intl.formatMessage(messages.questions),
      description: intl.formatMessage(messages.questionsDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.question),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['question', 'answer'],
          },
        ],
        properties: {
          question: {
            title: intl.formatMessage(messages.question),
            description: intl.formatMessage(messages.questionDescription),
            type: 'string',
          },
          answer: {
            title: intl.formatMessage(messages.answer),
            description: intl.formatMessage(messages.answerDescription),
            widget: 'limited_richtext',
          },
        },
        required: ['question', 'answer'],
      },
    },
  },
  required: ['questions'],
});

/**
 * Get default values for FAQPage from content
 *
 * FAQPage doesn't have standard content fields to extract from,
 * so we return an empty structure for the user to fill in.
 */
export const getFAQPageDefaults = (_content: any, _config: any) => {
  return {
    questions: [],
  };
};

/**
 * Convert form data to JSON-LD
 *
 * Transforms the form data structure into schema.org
 * compliant JSON-LD format for FAQPage.
 */
export const faqPageToJsonLd = (formData: any) => {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
  };

  if (formData.questions && formData.questions.length > 0) {
    jsonLd.mainEntity = formData.questions
      .filter((item: any) => item && item.question && item.answer)
      .map((item: any) => {
        // Extract HTML from the answer field
        // The limited_richtext widget stores data as {content-type, encoding, data}
        const answerText =
          typeof item.answer === 'object' && item.answer?.data
            ? item.answer.data
            : typeof item.answer === 'string'
              ? item.answer
              : '';

        return {
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answerText,
          },
        };
      });
  }

  return jsonLd;
};

/**
 * Convert JSON-LD back to form data
 *
 * Transforms JSON-LD structure back into form-editable format
 * for editing existing Rich Results.
 */
export const jsonLdToFAQPageForm = (jsonLd: any) => {
  const formData: any = {
    questions: [],
  };

  if (jsonLd.mainEntity && Array.isArray(jsonLd.mainEntity)) {
    formData.questions = jsonLd.mainEntity
      .filter(
        (item: any) =>
          item &&
          item['@type'] === 'Question' &&
          item.name &&
          item.acceptedAnswer,
      )
      .map((item: any) => {
        const answerText =
          typeof item.acceptedAnswer === 'object'
            ? item.acceptedAnswer.text || ''
            : '';

        return {
          '@id': uuid(),
          question: item.name || '',
          // Store answer in the format expected by limited_richtext widget
          answer: {
            'content-type': 'text/html',
            encoding: 'utf8',
            data: answerText,
          },
        };
      });
  }

  return formData;
};

/**
 * Register FAQPage Rich Result type
 *
 * This registers the type for volto-richresults.
 */
export const registerFAQPageRichResultType = (config: ConfigType) => {
  config = registerRichResultType(config, {
    id: 'FAQPage',
    title: 'FAQ Page',
    description:
      'Frequently Asked Questions page with questions and answers for Google rich results',
    schema: FAQPageSchema,
    getDefaults: getFAQPageDefaults,
    toJsonLd: faqPageToJsonLd,
    fromJsonLd: jsonLdToFAQPageForm,
    availableFor: ['*'], // Available for all content types
  });

  return config;
};

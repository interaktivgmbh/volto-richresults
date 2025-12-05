import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { registerRichResultType } from '../registry';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  howTo: {
    id: 'How-To',
    defaultMessage: 'How-To',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  timeFieldset: {
    id: 'Time & Cost',
    defaultMessage: 'Time & Cost',
  },
  stepsFieldset: {
    id: 'Steps',
    defaultMessage: 'Steps',
  },
  suppliesFieldset: {
    id: 'Supplies & Tools',
    defaultMessage: 'Supplies & Tools',
  },
  name: {
    id: 'How-To Name',
    defaultMessage: 'How-To Name',
  },
  nameDescription: {
    id: 'The title of the how-to instructions',
    defaultMessage: 'The title of the how-to instructions',
  },
  description: {
    id: 'How-To Description',
    defaultMessage: 'How-To Description',
  },
  descriptionDescription: {
    id: 'A description of the how-to',
    defaultMessage: 'A description of the how-to',
  },
  image: {
    id: 'How-To Image',
    defaultMessage: 'How-To Image',
  },
  imageDescription: {
    id: 'URL of an image for the how-to',
    defaultMessage: 'URL of an image for the how-to',
  },
  totalTime: {
    id: 'Total Time',
    defaultMessage: 'Total Time',
  },
  totalTimeDescription: {
    id: 'Total time to complete (ISO 8601 duration, e.g., PT30M for 30 minutes)',
    defaultMessage:
      'Total time to complete (ISO 8601 duration, e.g., PT30M for 30 minutes)',
  },
  prepTime: {
    id: 'Preparation Time',
    defaultMessage: 'Preparation Time',
  },
  prepTimeDescription: {
    id: 'Time to prepare before starting (ISO 8601 duration)',
    defaultMessage: 'Time to prepare before starting (ISO 8601 duration)',
  },
  performTime: {
    id: 'Perform Time',
    defaultMessage: 'Perform Time',
  },
  performTimeDescription: {
    id: 'Time to perform the instructions (ISO 8601 duration)',
    defaultMessage: 'Time to perform the instructions (ISO 8601 duration)',
  },
  estimatedCost: {
    id: 'Estimated Cost',
    defaultMessage: 'Estimated Cost',
  },
  estimatedCostDescription: {
    id: 'Estimated cost of supplies (e.g., "20 EUR" or "10-50 USD")',
    defaultMessage:
      'Estimated cost of supplies (e.g., "20 EUR" or "10-50 USD")',
  },
  yield: {
    id: 'Yield',
    defaultMessage: 'Yield',
  },
  yieldDescription: {
    id: 'The quantity produced (e.g., "1 birdhouse" or "4 servings")',
    defaultMessage:
      'The quantity produced (e.g., "1 birdhouse" or "4 servings")',
  },
  steps: {
    id: 'Steps',
    defaultMessage: 'Steps',
  },
  stepsDescription: {
    id: 'The step-by-step instructions',
    defaultMessage: 'The step-by-step instructions',
  },
  stepName: {
    id: 'Step Name',
    defaultMessage: 'Step Name',
  },
  stepNameDescription: {
    id: 'A short title for this step (optional)',
    defaultMessage: 'A short title for this step (optional)',
  },
  stepText: {
    id: 'Step Instructions',
    defaultMessage: 'Step Instructions',
  },
  stepTextDescription: {
    id: 'The detailed instructions for this step',
    defaultMessage: 'The detailed instructions for this step',
  },
  stepImage: {
    id: 'Step Image',
    defaultMessage: 'Step Image',
  },
  stepImageDescription: {
    id: 'URL of an image for this step (optional)',
    defaultMessage: 'URL of an image for this step (optional)',
  },
  supplies: {
    id: 'Supplies',
    defaultMessage: 'Supplies',
  },
  suppliesDescription: {
    id: 'Materials or supplies consumed when performing the instructions',
    defaultMessage:
      'Materials or supplies consumed when performing the instructions',
  },
  supplyName: {
    id: 'Supply Name',
    defaultMessage: 'Supply Name',
  },
  tools: {
    id: 'Tools',
    defaultMessage: 'Tools',
  },
  toolsDescription: {
    id: 'Tools used (but not consumed) when performing the instructions',
    defaultMessage:
      'Tools used (but not consumed) when performing the instructions',
  },
  toolName: {
    id: 'Tool Name',
    defaultMessage: 'Tool Name',
  },
});

/**
 * HowTo Rich Result Schema
 *
 * Defines the form schema for HowTo structured data.
 * Based on schema.org HowTo type.
 *
 * Note: HowTo was deprecated by Google for rich results as of September 2023.
 * The structured data is still valid schema.org and may be used by other
 * search engines or services.
 */
export const HowToSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.howTo),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['name', 'description', 'image'],
    },
    {
      id: 'time',
      title: intl.formatMessage(messages.timeFieldset),
      fields: [
        'totalTime',
        'prepTime',
        'performTime',
        'estimatedCost',
        'yield',
      ],
    },
    {
      id: 'steps',
      title: intl.formatMessage(messages.stepsFieldset),
      fields: ['steps'],
    },
    {
      id: 'supplies',
      title: intl.formatMessage(messages.suppliesFieldset),
      fields: ['supplies', 'tools'],
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
    image: {
      title: intl.formatMessage(messages.image),
      description: intl.formatMessage(messages.imageDescription),
      type: 'url',
      widget: 'image_url',
    },
    totalTime: {
      title: intl.formatMessage(messages.totalTime),
      description: intl.formatMessage(messages.totalTimeDescription),
      type: 'string',
    },
    prepTime: {
      title: intl.formatMessage(messages.prepTime),
      description: intl.formatMessage(messages.prepTimeDescription),
      type: 'string',
    },
    performTime: {
      title: intl.formatMessage(messages.performTime),
      description: intl.formatMessage(messages.performTimeDescription),
      type: 'string',
    },
    estimatedCost: {
      title: intl.formatMessage(messages.estimatedCost),
      description: intl.formatMessage(messages.estimatedCostDescription),
      type: 'string',
    },
    yield: {
      title: intl.formatMessage(messages.yield),
      description: intl.formatMessage(messages.yieldDescription),
      type: 'string',
    },
    steps: {
      title: intl.formatMessage(messages.steps),
      description: intl.formatMessage(messages.stepsDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.steps),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name', 'text', 'image'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.stepName),
            description: intl.formatMessage(messages.stepNameDescription),
            type: 'string',
          },
          text: {
            title: intl.formatMessage(messages.stepText),
            description: intl.formatMessage(messages.stepTextDescription),
            widget: 'textarea',
          },
          image: {
            title: intl.formatMessage(messages.stepImage),
            description: intl.formatMessage(messages.stepImageDescription),
            type: 'url',
            widget: 'image_url',
          },
        },
        required: ['text'],
      },
    },
    supplies: {
      title: intl.formatMessage(messages.supplies),
      description: intl.formatMessage(messages.suppliesDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.supplies),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.supplyName),
            type: 'string',
          },
        },
        required: ['name'],
      },
    },
    tools: {
      title: intl.formatMessage(messages.tools),
      description: intl.formatMessage(messages.toolsDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.tools),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.toolName),
            type: 'string',
          },
        },
        required: ['name'],
      },
    },
  },
  required: ['name', 'steps'],
});

/**
 * Get default values for HowTo from content
 *
 * Extracts relevant data from the current content object
 * to pre-populate the HowTo form.
 */
export const getHowToDefaults = (content: any, config: any) => {
  const defaults: any = {
    name: content.title || '',
    description: content.description || '',
    steps: [],
    supplies: [],
    tools: [],
  };

  return defaults;
};

/**
 * Convert form data to JSON-LD
 *
 * Transforms the form data structure into schema.org
 * compliant JSON-LD format for HowTo.
 */
export const howToToJsonLd = (formData: any) => {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: formData.name,
  };

  if (formData.description) {
    jsonLd.description = formData.description;
  }

  if (formData.image) {
    jsonLd.image = formData.image;
  }

  if (formData.totalTime) {
    jsonLd.totalTime = formData.totalTime;
  }

  if (formData.prepTime) {
    jsonLd.prepTime = formData.prepTime;
  }

  if (formData.performTime) {
    jsonLd.performTime = formData.performTime;
  }

  if (formData.estimatedCost) {
    jsonLd.estimatedCost = {
      '@type': 'MonetaryAmount',
      value: formData.estimatedCost,
    };
  }

  if (formData.yield) {
    jsonLd.yield = formData.yield;
  }

  // Steps
  if (formData.steps && formData.steps.length > 0) {
    jsonLd.step = formData.steps
      .filter((s: any) => s && s.text)
      .map((s: any, index: number) => {
        const step: any = {
          '@type': 'HowToStep',
          position: index + 1,
          text: s.text,
        };
        if (s.name) {
          step.name = s.name;
        }
        if (s.image) {
          step.image = s.image;
        }
        return step;
      });

    if (jsonLd.step.length === 0) {
      delete jsonLd.step;
    }
  }

  // Supplies
  if (formData.supplies && formData.supplies.length > 0) {
    jsonLd.supply = formData.supplies
      .filter((s: any) => s && s.name)
      .map((s: any) => ({
        '@type': 'HowToSupply',
        name: s.name,
      }));

    if (jsonLd.supply.length === 0) {
      delete jsonLd.supply;
    }
  }

  // Tools
  if (formData.tools && formData.tools.length > 0) {
    jsonLd.tool = formData.tools
      .filter((t: any) => t && t.name)
      .map((t: any) => ({
        '@type': 'HowToTool',
        name: t.name,
      }));

    if (jsonLd.tool.length === 0) {
      delete jsonLd.tool;
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
export const jsonLdToHowToForm = (jsonLd: any) => {
  const formData: any = {
    name: jsonLd.name || '',
    description: jsonLd.description || '',
    image: jsonLd.image || '',
    totalTime: jsonLd.totalTime || '',
    prepTime: jsonLd.prepTime || '',
    performTime: jsonLd.performTime || '',
    estimatedCost:
      typeof jsonLd.estimatedCost === 'object'
        ? jsonLd.estimatedCost.value || ''
        : jsonLd.estimatedCost || '',
    yield: jsonLd.yield || '',
    steps: [],
    supplies: [],
    tools: [],
  };

  // Steps
  if (jsonLd.step) {
    const steps = Array.isArray(jsonLd.step) ? jsonLd.step : [jsonLd.step];
    formData.steps = steps
      .filter((s: any) => s && (s.text || s.name))
      .map((s: any) => ({
        '@id': uuid(),
        name: s.name || '',
        text: s.text || '',
        image: s.image || '',
      }));
  }

  // Supplies
  if (jsonLd.supply) {
    const supplies = Array.isArray(jsonLd.supply)
      ? jsonLd.supply
      : [jsonLd.supply];
    formData.supplies = supplies
      .filter((s: any) => s && s.name)
      .map((s: any) => ({
        '@id': uuid(),
        name: typeof s === 'string' ? s : s.name || '',
      }));
  }

  // Tools
  if (jsonLd.tool) {
    const tools = Array.isArray(jsonLd.tool) ? jsonLd.tool : [jsonLd.tool];
    formData.tools = tools
      .filter((t: any) => t && t.name)
      .map((t: any) => ({
        '@id': uuid(),
        name: typeof t === 'string' ? t : t.name || '',
      }));
  }

  return formData;
};

/**
 * Register HowTo Rich Result type
 *
 * This registers the type for volto-richresults.
 *
 * Note: HowTo was deprecated by Google for rich results as of September 2023.
 * The structured data is still valid schema.org and may be used by other
 * search engines or services.
 */
export const registerHowToRichResultType = (config: any) => {
  config = registerRichResultType(config, {
    id: 'HowTo',
    title: 'How-To',
    description:
      'Step-by-step instructions for completing a task (schema.org type, deprecated by Google Sept 2023)',
    schema: HowToSchema,
    getDefaults: getHowToDefaults,
    toJsonLd: howToToJsonLd,
    fromJsonLd: jsonLdToHowToForm,
    availableFor: ['*'], // Available for all content types
  });

  return config;
};

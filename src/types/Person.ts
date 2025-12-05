import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import type { ConfigType } from '@plone/registry';
import { registerRichResultType } from '../registry';

const messages = defineMessages({
  person: {
    id: 'Person',
    defaultMessage: 'Person',
  },
  name: {
    id: 'Name',
    defaultMessage: 'Name',
  },
  nameDescription: {
    id: 'The full name of the person',
    defaultMessage: 'The full name of the person',
  },
  url: {
    id: 'URL',
    defaultMessage: 'URL',
  },
  urlDescription: {
    id: "The URL of the person's website or profile",
    defaultMessage: "The URL of the person's website or profile",
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  descriptionDescription: {
    id: 'A short description or bio of the person',
    defaultMessage: 'A short description or bio of the person',
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  imageDescription: {
    id: "URL of the person's photo",
    defaultMessage: "URL of the person's photo",
  },
  jobTitle: {
    id: 'Job Title',
    defaultMessage: 'Job Title',
  },
  jobTitleDescription: {
    id: "The person's job title or position",
    defaultMessage: "The person's job title or position",
  },
  telephone: {
    id: 'Telephone',
    defaultMessage: 'Telephone',
  },
  telephoneDescription: {
    id: 'Contact telephone number',
    defaultMessage: 'Contact telephone number',
  },
  email: {
    id: 'Email',
    defaultMessage: 'Email',
  },
  emailDescription: {
    id: 'Contact email address',
    defaultMessage: 'Contact email address',
  },
  address: {
    id: 'Address',
    defaultMessage: 'Address',
  },
  streetAddress: {
    id: 'Street Address',
    defaultMessage: 'Street Address',
  },
  addressLocality: {
    id: 'City',
    defaultMessage: 'City',
  },
  postalCode: {
    id: 'Postal Code',
    defaultMessage: 'Postal Code',
  },
  addressCountry: {
    id: 'Country',
    defaultMessage: 'Country',
  },
  sameAs: {
    id: 'Social Media Links',
    defaultMessage: 'Social Media Links',
  },
  sameAsDescription: {
    id: 'URLs of social media profiles (Facebook, Twitter, LinkedIn, etc.)',
    defaultMessage:
      'URLs of social media profiles (Facebook, Twitter, LinkedIn, etc.)',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  contactFieldset: {
    id: 'Contact',
    defaultMessage: 'Contact',
  },
  addressFieldset: {
    id: 'Address',
    defaultMessage: 'Address',
  },
  socialMediaFieldset: {
    id: 'Social Media',
    defaultMessage: 'Social Media',
  },
});

/**
 * Person Rich Result Schema
 *
 * Defines the form schema for Person structured data.
 * Based on schema.org Person type.
 */
export const PersonSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.person),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['name', 'url', 'description', 'image', 'jobTitle'],
    },
    {
      id: 'contact',
      title: intl.formatMessage(messages.contactFieldset),
      fields: ['telephone', 'email'],
    },
    {
      id: 'address',
      title: intl.formatMessage(messages.addressFieldset),
      fields: [
        'streetAddress',
        'addressLocality',
        'postalCode',
        'addressCountry',
      ],
    },
    {
      id: 'social',
      title: intl.formatMessage(messages.socialMediaFieldset),
      fields: ['sameAs'],
    },
  ],
  properties: {
    name: {
      title: intl.formatMessage(messages.name),
      description: intl.formatMessage(messages.nameDescription),
      type: 'string',
    },
    url: {
      title: intl.formatMessage(messages.url),
      description: intl.formatMessage(messages.urlDescription),
      type: 'url',
      widget: 'url',
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
    jobTitle: {
      title: intl.formatMessage(messages.jobTitle),
      description: intl.formatMessage(messages.jobTitleDescription),
      type: 'string',
    },
    telephone: {
      title: intl.formatMessage(messages.telephone),
      description: intl.formatMessage(messages.telephoneDescription),
      type: 'string',
    },
    email: {
      title: intl.formatMessage(messages.email),
      description: intl.formatMessage(messages.emailDescription),
      type: 'email',
    },
    streetAddress: {
      title: intl.formatMessage(messages.streetAddress),
      type: 'string',
    },
    addressLocality: {
      title: intl.formatMessage(messages.addressLocality),
      type: 'string',
    },
    postalCode: {
      title: intl.formatMessage(messages.postalCode),
      type: 'string',
    },
    addressCountry: {
      title: intl.formatMessage(messages.addressCountry),
      type: 'string',
    },
    sameAs: {
      title: intl.formatMessage(messages.sameAs),
      description: intl.formatMessage(messages.sameAsDescription),
      widget: 'array',
      itemsType: 'url', // Validate each item as URL
    },
  },
  required: ['name'],
});

/**
 * Get default values for Person from content
 *
 * Extracts relevant data from the current content object
 * to pre-populate the Person form.
 */
export const getPersonDefaults = (content: any, config: any) => {
  return {
    name: content.title || '',
    url: '',
    description: content.description || '',
    image: '',
    jobTitle: '',
    telephone: '',
    email: '',
    streetAddress: '',
    addressLocality: '',
    postalCode: '',
    addressCountry: '',
    sameAs: [],
  };
};

/**
 * Convert form data to JSON-LD
 *
 * Transforms the form data structure into schema.org
 * compliant JSON-LD format as a ProfilePage with Person as mainEntity.
 * This is the required format for Google Rich Results.
 */
export const personToJsonLd = (formData: any) => {
  // Build the Person object
  const person: any = {
    '@type': 'Person',
    name: formData.name,
  };

  // Add optional fields only if they have values
  if (formData.url) {
    person.url = formData.url;
  }

  if (formData.description) {
    person.description = formData.description;
  }

  if (formData.image) {
    person.image = formData.image;
  }

  if (formData.jobTitle) {
    person.jobTitle = formData.jobTitle;
  }

  if (formData.telephone) {
    person.telephone = formData.telephone;
  }

  if (formData.email) {
    person.email = formData.email;
  }

  // Add address if any address field is filled
  if (
    formData.streetAddress ||
    formData.addressLocality ||
    formData.postalCode ||
    formData.addressCountry
  ) {
    const address: any = {
      '@type': 'PostalAddress',
    };

    if (formData.streetAddress) {
      address.streetAddress = formData.streetAddress;
    }
    if (formData.addressLocality) {
      address.addressLocality = formData.addressLocality;
    }
    if (formData.postalCode) {
      address.postalCode = formData.postalCode;
    }
    if (formData.addressCountry) {
      address.addressCountry = formData.addressCountry;
    }

    person.address = address;
  }

  // Add social media links
  if (formData.sameAs && formData.sameAs.length > 0) {
    const validLinks = formData.sameAs.filter(
      (link: string) => link && link.trim(),
    );
    if (validLinks.length > 0) {
      person.sameAs = validLinks;
    }
  }

  // Wrap Person in ProfilePage (required for Google Rich Results)
  const profilePage: any = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: person,
  };

  return profilePage;
};

/**
 * Convert JSON-LD back to form data
 *
 * Transforms JSON-LD structure back into form-editable format
 * for editing existing Rich Results.
 * Handles both ProfilePage (with Person in mainEntity) and direct Person objects.
 */
export const jsonLdToPersonForm = (jsonLd: any) => {
  // Extract Person data from ProfilePage mainEntity if present
  const person = jsonLd['@type'] === 'ProfilePage' ? jsonLd.mainEntity : jsonLd;

  const formData = {
    name: person.name || '',
    url: person.url || '',
    description: person.description || '',
    image: person.image || '',
    jobTitle: person.jobTitle || '',
    telephone: person.telephone || '',
    email: person.email || '',
    streetAddress: person.address?.streetAddress || '',
    addressLocality: person.address?.addressLocality || '',
    postalCode: person.address?.postalCode || '',
    addressCountry: person.address?.addressCountry || '',
    sameAs: person.sameAs || [],
  };

  return formData;
};

/**
 * Register Person Rich Result type
 *
 * This registers the type for volto-richresults.
 * but titled 'Person' for user clarity.
 */
export const registerPersonRichResultType = (config: ConfigType) => {
  config = registerRichResultType(config, {
    id: 'Person',
    title: 'Person',
    description: 'Person profile with contact details and social media',
    schema: PersonSchema,
    getDefaults: getPersonDefaults,
    toJsonLd: personToJsonLd,
    fromJsonLd: jsonLdToPersonForm,
    availableFor: ['*'], // Available for all content types
  });

  return config;
};

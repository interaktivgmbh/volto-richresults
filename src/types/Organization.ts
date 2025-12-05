import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { registerRichResultType } from '../registry';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  organization: {
    id: 'Organization',
    defaultMessage: 'Organization',
  },
  name: {
    id: 'Name',
    defaultMessage: 'Name',
  },
  nameDescription: {
    id: 'The name of the organization',
    defaultMessage: 'The name of the organization',
  },
  url: {
    id: 'URL',
    defaultMessage: 'URL',
  },
  urlDescription: {
    id: 'The URL of the organization website',
    defaultMessage: 'The URL of the organization website',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  descriptionDescription: {
    id: 'A short description of the organization',
    defaultMessage: 'A short description of the organization',
  },
  logo: {
    id: 'Logo',
    defaultMessage: 'Logo',
  },
  logoDescription: {
    id: 'URL of the organization logo',
    defaultMessage: 'URL of the organization logo',
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
  sameAsUrl: {
    id: 'Profile URL',
    defaultMessage: 'Profile URL',
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
  websiteRequired: {
    id: 'Either URL or at least one social media link is required',
    defaultMessage: 'Either URL or at least one social media link is required',
  },
  contactRequired: {
    id: 'Either email or address information is required',
    defaultMessage: 'Either email or address information is required',
  },
});

/**
 * Organization Rich Result Schema
 *
 * Defines the form schema for Organization structured data.
 * Based on schema.org Organization type.
 */
export const OrganizationSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.organization),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['name', 'url', 'description', 'logo'],
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
    logo: {
      title: intl.formatMessage(messages.logo),
      description: intl.formatMessage(messages.logoDescription),
      type: 'url',
      widget: 'image_url',
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
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.sameAs),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['url'],
          },
        ],
        properties: {
          url: {
            title: intl.formatMessage(messages.sameAsUrl),
            type: 'url',
            widget: 'string',
          },
        },
        required: ['url'],
      },
    },
  },
  required: ['name'],
});

/**
 * Get default values for Organization from content
 *
 * Extracts relevant data from the current content object
 * to pre-populate the Organization form.
 */
export const getOrganizationDefaults = (content: any, config: any) => {
  return {
    name: content.title || '',
    url: content['@id'] || '',
    description: content.description || '',
    logo: '',
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
 * compliant JSON-LD format.
 */
export const organizationToJsonLd = (formData: any) => {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: formData.name,
  };

  // Add optional fields only if they have values
  if (formData.url) {
    jsonLd.url = formData.url;
  }

  if (formData.description) {
    jsonLd.description = formData.description;
  }

  if (formData.logo) {
    jsonLd.logo = formData.logo;
  }

  if (formData.telephone) {
    jsonLd.telephone = formData.telephone;
  }

  if (formData.email) {
    jsonLd.email = formData.email;
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

    jsonLd.address = address;
  }

  // Add social media links (extract URLs from object_list format)
  if (formData.sameAs && formData.sameAs.length > 0) {
    const validLinks = formData.sameAs
      .filter((item: any) => item && item.url)
      .map((item: any) => item.url);
    if (validLinks.length > 0) {
      jsonLd.sameAs = validLinks;
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
export const jsonLdToOrganizationForm = (jsonLd: any) => {
  // Convert sameAs URLs to object_list format (JSON-LD allows single value or array)
  const sameAsUrls = jsonLd.sameAs
    ? Array.isArray(jsonLd.sameAs)
      ? jsonLd.sameAs
      : [jsonLd.sameAs]
    : [];

  const formData = {
    name: jsonLd.name || '',
    url: jsonLd.url || '',
    description: jsonLd.description || '',
    logo: jsonLd.logo || '',
    telephone: jsonLd.telephone || '',
    email: jsonLd.email || '',
    streetAddress: jsonLd.address?.streetAddress || '',
    addressLocality: jsonLd.address?.addressLocality || '',
    postalCode: jsonLd.address?.postalCode || '',
    addressCountry: jsonLd.address?.addressCountry || '',
    // Convert URLs to object_list format with @id for widget tracking
    sameAs: sameAsUrls.map((url: string) => ({
      '@id': uuid(),
      url: url,
    })),
  };

  return formData;
};

/**
 * Validate Organization Rich Result
 *
 * Checks conditional requirements:
 * - Website: Either url OR at least one sameAs link
 * - Contact: Either email OR address fields
 */
export const validateOrganization = (
  formData: any,
  intl: any,
): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};

  // Check if website is provided (url OR sameAs)
  const hasUrl = formData.url && formData.url.trim() !== '';
  const hasSocialMedia =
    formData.sameAs &&
    Array.isArray(formData.sameAs) &&
    formData.sameAs.some((item: any) => item && item.url);

  if (!hasUrl && !hasSocialMedia) {
    // Add error to both url and sameAs fields
    const websiteError = intl.formatMessage(messages.websiteRequired);
    errors.url = [websiteError];
    errors.sameAs = [websiteError];
  }

  // Check if contact is provided (email OR address)
  const hasEmail = formData.email && formData.email.trim() !== '';
  const hasAddress =
    (formData.streetAddress && formData.streetAddress.trim() !== '') ||
    (formData.addressLocality && formData.addressLocality.trim() !== '') ||
    (formData.postalCode && formData.postalCode.trim() !== '') ||
    (formData.addressCountry && formData.addressCountry.trim() !== '');

  if (!hasEmail && !hasAddress) {
    // Add error to email and address fields
    const contactError = intl.formatMessage(messages.contactRequired);
    errors.email = [contactError];
    errors.streetAddress = [contactError];
  }

  return errors;
};

/**
 * Register Organization Rich Result type
 *
 * This registers the type for volto-richresults.
 */
export const registerOrganizationRichResultType = (config: any) => {
  config = registerRichResultType(config, {
    id: 'Organization',
    title: 'Organization',
    description: 'Organization information with contact details and address',
    schema: OrganizationSchema,
    getDefaults: getOrganizationDefaults,
    toJsonLd: organizationToJsonLd,
    fromJsonLd: jsonLdToOrganizationForm,
    validate: validateOrganization,
    availableFor: ['*'], // Available for all content types
  });

  return config;
};

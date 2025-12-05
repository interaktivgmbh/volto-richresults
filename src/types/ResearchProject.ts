import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import type { ConfigType } from '@plone/registry';
import { registerRichResultType } from '../registry';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  researchProject: {
    id: 'Research Project',
    defaultMessage: 'Research Project',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  fundingFieldset: {
    id: 'Funding',
    defaultMessage: 'Funding',
  },
  membersFieldset: {
    id: 'Members',
    defaultMessage: 'Members',
  },
  additionalFieldset: {
    id: 'Additional Information',
    defaultMessage: 'Additional Information',
  },
  name: {
    id: 'Project Name',
    defaultMessage: 'Project Name',
  },
  nameDescription: {
    id: 'The name of the research project',
    defaultMessage: 'The name of the research project',
  },
  description: {
    id: 'Project Description',
    defaultMessage: 'Project Description',
  },
  descriptionDescription: {
    id: 'A description of the research project',
    defaultMessage: 'A description of the research project',
  },
  url: {
    id: 'Project URL',
    defaultMessage: 'Project URL',
  },
  urlDescription: {
    id: 'URL of the research project website',
    defaultMessage: 'URL of the research project website',
  },
  image: {
    id: 'Project Image',
    defaultMessage: 'Project Image',
  },
  imageDescription: {
    id: 'URL of an image representing the project',
    defaultMessage: 'URL of an image representing the project',
  },
  keywords: {
    id: 'Keywords',
    defaultMessage: 'Keywords',
  },
  keywordsDescription: {
    id: 'Keywords describing the research project (comma-separated)',
    defaultMessage:
      'Keywords describing the research project (comma-separated)',
  },
  startDate: {
    id: 'Start Date',
    defaultMessage: 'Start Date',
  },
  startDateDescription: {
    id: 'When the research project started',
    defaultMessage: 'When the research project started',
  },
  endDate: {
    id: 'End Date',
    defaultMessage: 'End Date',
  },
  endDateDescription: {
    id: 'When the research project ends or ended',
    defaultMessage: 'When the research project ends or ended',
  },
  funders: {
    id: 'Funders',
    defaultMessage: 'Funders',
  },
  fundersDescription: {
    id: 'Organizations or persons providing funding for the project',
    defaultMessage:
      'Organizations or persons providing funding for the project',
  },
  funderName: {
    id: 'Funder Name',
    defaultMessage: 'Funder Name',
  },
  funderUrl: {
    id: 'Funder URL',
    defaultMessage: 'Funder URL',
  },
  funderType: {
    id: 'Funder Type',
    defaultMessage: 'Funder Type',
  },
  organization: {
    id: 'Organization',
    defaultMessage: 'Organization',
  },
  person: {
    id: 'Person',
    defaultMessage: 'Person',
  },
  funding: {
    id: 'Funding Details',
    defaultMessage: 'Funding Details',
  },
  fundingDescription: {
    id: 'Details about the funding/grant',
    defaultMessage: 'Details about the funding/grant',
  },
  grantName: {
    id: 'Grant Name',
    defaultMessage: 'Grant Name',
  },
  grantIdentifier: {
    id: 'Grant Identifier',
    defaultMessage: 'Grant Identifier',
  },
  grantIdentifierDescription: {
    id: 'Unique identifier for the grant (e.g., grant number)',
    defaultMessage: 'Unique identifier for the grant (e.g., grant number)',
  },
  members: {
    id: 'Project Members',
    defaultMessage: 'Project Members',
  },
  membersDescription: {
    id: 'Researchers and team members involved in the project',
    defaultMessage: 'Researchers and team members involved in the project',
  },
  memberName: {
    id: 'Member Name',
    defaultMessage: 'Member Name',
  },
  memberUrl: {
    id: 'Member URL',
    defaultMessage: 'Member URL',
  },
  memberRole: {
    id: 'Role',
    defaultMessage: 'Role',
  },
  memberRoleDescription: {
    id: 'Role in the project (e.g., Principal Investigator)',
    defaultMessage: 'Role in the project (e.g., Principal Investigator)',
  },
  parentOrganization: {
    id: 'Parent Organization',
    defaultMessage: 'Parent Organization',
  },
  parentOrganizationDescription: {
    id: 'The organization hosting this research project',
    defaultMessage: 'The organization hosting this research project',
  },
  parentOrgName: {
    id: 'Organization Name',
    defaultMessage: 'Organization Name',
  },
  parentOrgUrl: {
    id: 'Organization URL',
    defaultMessage: 'Organization URL',
  },
  sameAs: {
    id: 'Same As',
    defaultMessage: 'Same As',
  },
  sameAsDescription: {
    id: 'URLs of other pages about this project (e.g., social media, databases)',
    defaultMessage:
      'URLs of other pages about this project (e.g., social media, databases)',
  },
  sameAsUrl: {
    id: 'URL',
    defaultMessage: 'URL',
  },
});

/**
 * ResearchProject Rich Result Schema
 *
 * Defines the form schema for ResearchProject structured data.
 * Based on schema.org ResearchProject type.
 *
 * Note: ResearchProject is a valid schema.org type but is NOT currently
 * supported by Google for rich results. The structured data is still
 * valid and may be used by other search engines or services.
 */
export const ResearchProjectSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.researchProject),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: [
        'name',
        'description',
        'url',
        'image',
        'keywords',
        'startDate',
        'endDate',
      ],
    },
    {
      id: 'funding',
      title: intl.formatMessage(messages.fundingFieldset),
      fields: ['funders', 'funding'],
    },
    {
      id: 'members',
      title: intl.formatMessage(messages.membersFieldset),
      fields: ['members', 'parentOrganization'],
    },
    {
      id: 'additional',
      title: intl.formatMessage(messages.additionalFieldset),
      fields: ['sameAs'],
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
    keywords: {
      title: intl.formatMessage(messages.keywords),
      description: intl.formatMessage(messages.keywordsDescription),
      type: 'string',
    },
    startDate: {
      title: intl.formatMessage(messages.startDate),
      description: intl.formatMessage(messages.startDateDescription),
      widget: 'datetime',
    },
    endDate: {
      title: intl.formatMessage(messages.endDate),
      description: intl.formatMessage(messages.endDateDescription),
      widget: 'datetime',
    },
    funders: {
      title: intl.formatMessage(messages.funders),
      description: intl.formatMessage(messages.fundersDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.funders),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['funderType', 'name', 'url'],
          },
        ],
        properties: {
          funderType: {
            title: intl.formatMessage(messages.funderType),
            type: 'string',
            choices: [
              ['Organization', intl.formatMessage(messages.organization)],
              ['Person', intl.formatMessage(messages.person)],
            ],
            default: 'Organization',
          },
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
    funding: {
      title: intl.formatMessage(messages.funding),
      description: intl.formatMessage(messages.fundingDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.funding),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name', 'identifier'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.grantName),
            type: 'string',
          },
          identifier: {
            title: intl.formatMessage(messages.grantIdentifier),
            description: intl.formatMessage(
              messages.grantIdentifierDescription,
            ),
            type: 'string',
          },
        },
        required: ['name'],
      },
    },
    members: {
      title: intl.formatMessage(messages.members),
      description: intl.formatMessage(messages.membersDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.members),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name', 'url', 'role'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.memberName),
            type: 'string',
          },
          url: {
            title: intl.formatMessage(messages.memberUrl),
            type: 'string',
            widget: 'url',
          },
          role: {
            title: intl.formatMessage(messages.memberRole),
            description: intl.formatMessage(messages.memberRoleDescription),
            type: 'string',
          },
        },
        required: ['name'],
      },
    },
    parentOrganization: {
      title: intl.formatMessage(messages.parentOrganization),
      description: intl.formatMessage(messages.parentOrganizationDescription),
      widget: 'object',
      schema: {
        title: intl.formatMessage(messages.parentOrganization),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name', 'url'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.parentOrgName),
            type: 'string',
          },
          url: {
            title: intl.formatMessage(messages.parentOrgUrl),
            type: 'string',
            widget: 'url',
          },
        },
        required: [],
      },
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
            type: 'string',
            widget: 'url',
          },
        },
        required: ['url'],
      },
    },
  },
  required: ['name'],
});

/**
 * Get default values for ResearchProject from content
 *
 * Extracts relevant data from the current content object
 * to pre-populate the ResearchProject form.
 */
export const getResearchProjectDefaults = (content: any, config: any) => {
  const defaults: any = {
    name: content.title || '',
    description: content.description || '',
    url: content['@id'] || '',
    keywords: content.Subject?.join(', ') || '',
    funders: [],
    funding: [],
    members: [],
    sameAs: [],
  };

  return defaults;
};

/**
 * Convert form data to JSON-LD
 *
 * Transforms the form data structure into schema.org
 * compliant JSON-LD format for ResearchProject.
 */
export const researchProjectToJsonLd = (formData: any) => {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'ResearchProject',
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

  if (formData.keywords) {
    // Convert comma-separated string to array
    jsonLd.keywords = formData.keywords
      .split(',')
      .map((k: string) => k.trim())
      .filter((k: string) => k);
  }

  if (formData.startDate) {
    jsonLd.startDate = formData.startDate;
  }

  if (formData.endDate) {
    jsonLd.endDate = formData.endDate;
  }

  // Funders
  if (formData.funders && formData.funders.length > 0) {
    jsonLd.funder = formData.funders
      .filter((f: any) => f && f.name)
      .map((f: any) => {
        const funder: any = {
          '@type': f.funderType || 'Organization',
          name: f.name,
        };
        if (f.url) {
          funder.url = f.url;
        }
        return funder;
      });

    if (jsonLd.funder.length === 0) {
      delete jsonLd.funder;
    }
  }

  // Funding/Grants
  if (formData.funding && formData.funding.length > 0) {
    jsonLd.funding = formData.funding
      .filter((f: any) => f && f.name)
      .map((f: any) => {
        const grant: any = {
          '@type': 'Grant',
          name: f.name,
        };
        if (f.identifier) {
          grant.identifier = f.identifier;
        }
        return grant;
      });

    if (jsonLd.funding.length === 0) {
      delete jsonLd.funding;
    }
  }

  // Members
  if (formData.members && formData.members.length > 0) {
    jsonLd.member = formData.members
      .filter((m: any) => m && m.name)
      .map((m: any) => {
        const member: any = {
          '@type': 'Person',
          name: m.name,
        };
        if (m.url) {
          member.url = m.url;
        }
        if (m.role) {
          member.jobTitle = m.role;
        }
        return member;
      });

    if (jsonLd.member.length === 0) {
      delete jsonLd.member;
    }
  }

  // Parent Organization
  if (formData.parentOrganization?.name) {
    jsonLd.parentOrganization = {
      '@type': 'Organization',
      name: formData.parentOrganization.name,
    };
    if (formData.parentOrganization.url) {
      jsonLd.parentOrganization.url = formData.parentOrganization.url;
    }
  }

  // Same As URLs
  if (formData.sameAs && formData.sameAs.length > 0) {
    const urls = formData.sameAs
      .filter((s: any) => s && s.url)
      .map((s: any) => s.url);

    if (urls.length > 0) {
      jsonLd.sameAs = urls;
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
export const jsonLdToResearchProjectForm = (jsonLd: any) => {
  const formData: any = {
    name: jsonLd.name || '',
    description: jsonLd.description || '',
    url: jsonLd.url || '',
    image: jsonLd.image || '',
    keywords: Array.isArray(jsonLd.keywords)
      ? jsonLd.keywords.join(', ')
      : jsonLd.keywords || '',
    startDate: jsonLd.startDate || '',
    endDate: jsonLd.endDate || '',
    funders: [],
    funding: [],
    members: [],
    parentOrganization: {
      name: '',
      url: '',
    },
    sameAs: [],
  };

  // Funders
  if (jsonLd.funder) {
    const funders = Array.isArray(jsonLd.funder)
      ? jsonLd.funder
      : [jsonLd.funder];
    formData.funders = funders
      .filter((f: any) => f && f.name)
      .map((f: any) => ({
        '@id': uuid(),
        funderType: f['@type'] || 'Organization',
        name: f.name || '',
        url: f.url || '',
      }));
  }

  // Funding/Grants
  if (jsonLd.funding) {
    const funding = Array.isArray(jsonLd.funding)
      ? jsonLd.funding
      : [jsonLd.funding];
    formData.funding = funding
      .filter((f: any) => f && f.name)
      .map((f: any) => ({
        '@id': uuid(),
        name: f.name || '',
        identifier: f.identifier || '',
      }));
  }

  // Members
  if (jsonLd.member) {
    const members = Array.isArray(jsonLd.member)
      ? jsonLd.member
      : [jsonLd.member];
    formData.members = members
      .filter((m: any) => m && m.name)
      .map((m: any) => ({
        '@id': uuid(),
        name: m.name || '',
        url: m.url || '',
        role: m.jobTitle || '',
      }));
  }

  // Parent Organization
  if (jsonLd.parentOrganization) {
    formData.parentOrganization = {
      name: jsonLd.parentOrganization.name || '',
      url: jsonLd.parentOrganization.url || '',
    };
  }

  // Same As URLs
  if (jsonLd.sameAs) {
    const urls = Array.isArray(jsonLd.sameAs) ? jsonLd.sameAs : [jsonLd.sameAs];
    formData.sameAs = urls
      .filter((url: string) => url)
      .map((url: string) => ({
        '@id': uuid(),
        url: url,
      }));
  }

  return formData;
};

/**
 * Register ResearchProject Rich Result type
 *
 * This registers the type for volto-richresults.
 *
 * Note: ResearchProject is a valid schema.org type but is NOT currently
 * supported by Google for rich results. The structured data is still
 * valid and may be used by other search engines or services.
 */
export const registerResearchProjectRichResultType = (config: ConfigType) => {
  config = registerRichResultType(config, {
    id: 'ResearchProject',
    title: 'Research Project',
    description:
      'Research project structured data with funding, members, and organization info (schema.org type, not Google rich result)',
    schema: ResearchProjectSchema,
    getDefaults: getResearchProjectDefaults,
    toJsonLd: researchProjectToJsonLd,
    fromJsonLd: jsonLdToResearchProjectForm,
    availableFor: ['*'], // Available for all content types
  });

  return config;
};

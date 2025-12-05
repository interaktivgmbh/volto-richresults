import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import type { ConfigType } from '@plone/registry';
import { registerRichResultType } from '../registry';
import {
  convertStringToSlate,
  convertHtmlToSlate,
  convertSlateToString,
} from '../helpers/SlateConverters';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  jobPosting: {
    id: 'Job Posting',
    defaultMessage: 'Job Posting',
  },
  title: {
    id: 'Job Title',
    defaultMessage: 'Job Title',
  },
  titleDescription: {
    id: 'The title of the job position',
    defaultMessage: 'The title of the job position',
  },
  description: {
    id: 'Job Description',
    defaultMessage: 'Job Description',
  },
  descriptionDescription: {
    id: 'A detailed description of the job',
    defaultMessage: 'A detailed description of the job',
  },
  datePosted: {
    id: 'Date Posted',
    defaultMessage: 'Date Posted',
  },
  datePostedDescription: {
    id: 'When the job was posted',
    defaultMessage: 'When the job was posted',
  },
  validThrough: {
    id: 'Valid Through',
    defaultMessage: 'Valid Through',
  },
  validThroughDescription: {
    id: 'The date when the job posting expires',
    defaultMessage: 'The date when the job posting expires',
  },
  employmentType: {
    id: 'Employment Type',
    defaultMessage: 'Employment Type',
  },
  employmentTypeDescription: {
    id: 'Type of employment (Full-time, Part-time, etc.)',
    defaultMessage: 'Type of employment (Full-time, Part-time, etc.)',
  },
  homeoffice: {
    id: 'Remote/Home Office',
    defaultMessage: 'Remote/Home Office',
  },
  homeofficeDescription: {
    id: 'This is a 100% remote/home office position',
    defaultMessage: 'This is a 100% remote/home office position',
  },
  applicantLocationRequirements: {
    id: 'Applicant Location Requirements',
    defaultMessage: 'Applicant Location Requirements',
  },
  applicantLocationRequirementsDescription: {
    id: 'Countries where applicants must be located (e.g., Canada, Germany)',
    defaultMessage:
      'Countries where applicants must be located (e.g., Canada, Germany)',
  },
  locationRequirementName: {
    id: 'Country Name',
    defaultMessage: 'Country Name',
  },
  hiringOrganization: {
    id: 'Hiring Organization',
    defaultMessage: 'Hiring Organization',
  },
  organizationName: {
    id: 'Organization Name',
    defaultMessage: 'Organization Name',
  },
  organizationUrl: {
    id: 'Organization Website',
    defaultMessage: 'Organization Website',
  },
  organizationLogo: {
    id: 'Organization Logo',
    defaultMessage: 'Organization Logo',
  },
  jobLocation: {
    id: 'Job Location',
    defaultMessage: 'Job Location',
  },
  streetAddress: {
    id: 'Street Address',
    defaultMessage: 'Street Address',
  },
  addressLocality: {
    id: 'City',
    defaultMessage: 'City',
  },
  addressRegion: {
    id: 'State/Region',
    defaultMessage: 'State/Region',
  },
  postalCode: {
    id: 'Postal Code',
    defaultMessage: 'Postal Code',
  },
  addressCountry: {
    id: 'Country',
    defaultMessage: 'Country',
  },
  salary: {
    id: 'Salary',
    defaultMessage: 'Salary',
  },
  salaryCurrency: {
    id: 'Currency',
    defaultMessage: 'Currency',
  },
  salaryValue: {
    id: 'Amount',
    defaultMessage: 'Amount',
  },
  salaryMinValue: {
    id: 'Minimum Amount',
    defaultMessage: 'Minimum Amount',
  },
  salaryMaxValue: {
    id: 'Maximum Amount',
    defaultMessage: 'Maximum Amount',
  },
  salaryUnitText: {
    id: 'Period',
    defaultMessage: 'Period',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  organizationFieldset: {
    id: 'Hiring Organization',
    defaultMessage: 'Hiring Organization',
  },
  locationFieldset: {
    id: 'Location',
    defaultMessage: 'Location',
  },
  salaryFieldset: {
    id: 'Salary',
    defaultMessage: 'Salary',
  },
  employmentTypeFullTime: {
    id: 'Full-time',
    defaultMessage: 'Full-time',
  },
  employmentTypePartTime: {
    id: 'Part-time',
    defaultMessage: 'Part-time',
  },
  employmentTypeContractor: {
    id: 'Contractor',
    defaultMessage: 'Contractor',
  },
  employmentTypeTemporary: {
    id: 'Temporary',
    defaultMessage: 'Temporary',
  },
  employmentTypeIntern: {
    id: 'Intern',
    defaultMessage: 'Intern',
  },
  employmentTypeVolunteer: {
    id: 'Volunteer',
    defaultMessage: 'Volunteer',
  },
  employmentTypePerDiem: {
    id: 'Per Diem',
    defaultMessage: 'Per Diem',
  },
  employmentTypeOther: {
    id: 'Other',
    defaultMessage: 'Other',
  },
  salaryUnitTextPerHour: {
    id: 'Per Hour',
    defaultMessage: 'Per Hour',
  },
  salaryUnitTextPerDay: {
    id: 'Per Day',
    defaultMessage: 'Per Day',
  },
  salaryUnitTextPerWeek: {
    id: 'Per Week',
    defaultMessage: 'Per Week',
  },
  salaryUnitTextPerMonth: {
    id: 'Per Month',
    defaultMessage: 'Per Month',
  },
  salaryUnitTextPerYear: {
    id: 'Per Year',
    defaultMessage: 'Per Year',
  },
  locationRequired: {
    id: 'Either a job location (address) or remote work with applicant location requirements is required',
    defaultMessage:
      'Either a job location (address) or remote work with applicant location requirements is required',
  },
  applicantLocationRequired: {
    id: 'For remote positions, at least one applicant location requirement (country) is required',
    defaultMessage:
      'For remote positions, at least one applicant location requirement (country) is required',
  },
});

/**
 * Job Posting Rich Result Schema
 *
 * Defines the form schema for JobPosting structured data.
 * Based on schema.org JobPosting type.
 */
export const JobPostingSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.jobPosting),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: [
        'title',
        'description',
        'datePosted',
        'validThrough',
        'employmentType',
      ],
    },
    {
      id: 'organization',
      title: intl.formatMessage(messages.organizationFieldset),
      fields: ['organizationName', 'organizationUrl', 'organizationLogo'],
    },
    {
      id: 'location',
      title: intl.formatMessage(messages.locationFieldset),
      fields: [
        'homeoffice',
        'applicantLocationRequirements',
        'streetAddress',
        'addressLocality',
        'addressRegion',
        'postalCode',
        'addressCountry',
      ],
    },
    {
      id: 'salary',
      title: intl.formatMessage(messages.salaryFieldset),
      fields: [
        'salaryCurrency',
        'salaryMinValue',
        'salaryMaxValue',
        'salaryUnitText',
      ],
    },
  ],
  properties: {
    title: {
      title: intl.formatMessage(messages.title),
      description: intl.formatMessage(messages.titleDescription),
      type: 'string',
    },
    description: {
      title: intl.formatMessage(messages.description),
      description: intl.formatMessage(messages.descriptionDescription),
      // Use custom widget with limited formatting (Google-supported only)
      widget: 'limited_richtext',
    },
    datePosted: {
      title: intl.formatMessage(messages.datePosted),
      description: intl.formatMessage(messages.datePostedDescription),
      widget: 'datetime',
    },
    validThrough: {
      title: intl.formatMessage(messages.validThrough),
      description: intl.formatMessage(messages.validThroughDescription),
      widget: 'datetime',
    },
    employmentType: {
      title: intl.formatMessage(messages.employmentType),
      description: intl.formatMessage(messages.employmentTypeDescription),
      widget: 'array',
      choices: [
        ['FULL_TIME', intl.formatMessage(messages.employmentTypeFullTime)],
        ['PART_TIME', intl.formatMessage(messages.employmentTypePartTime)],
        ['CONTRACTOR', intl.formatMessage(messages.employmentTypeContractor)],
        ['TEMPORARY', intl.formatMessage(messages.employmentTypeTemporary)],
        ['INTERN', intl.formatMessage(messages.employmentTypeIntern)],
        ['VOLUNTEER', intl.formatMessage(messages.employmentTypeVolunteer)],
        ['PER_DIEM', intl.formatMessage(messages.employmentTypePerDiem)],
        ['OTHER', intl.formatMessage(messages.employmentTypeOther)],
      ],
    },
    organizationName: {
      title: intl.formatMessage(messages.organizationName),
      type: 'string',
    },
    organizationUrl: {
      title: intl.formatMessage(messages.organizationUrl),
      type: 'url',
      widget: 'url',
    },
    organizationLogo: {
      title: intl.formatMessage(messages.organizationLogo),
      type: 'url',
      widget: 'image_url',
    },
    homeoffice: {
      title: intl.formatMessage(messages.homeoffice),
      description: intl.formatMessage(messages.homeofficeDescription),
      type: 'boolean',
    },
    applicantLocationRequirements: {
      title: intl.formatMessage(messages.applicantLocationRequirements),
      description: intl.formatMessage(
        messages.applicantLocationRequirementsDescription,
      ),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.applicantLocationRequirements),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['name'],
          },
        ],
        properties: {
          name: {
            title: intl.formatMessage(messages.locationRequirementName),
            type: 'string',
          },
        },
        required: ['name'],
      },
    },
    streetAddress: {
      title: intl.formatMessage(messages.streetAddress),
      type: 'string',
    },
    addressLocality: {
      title: intl.formatMessage(messages.addressLocality),
      type: 'string',
    },
    addressRegion: {
      title: intl.formatMessage(messages.addressRegion),
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
    salaryCurrency: {
      title: intl.formatMessage(messages.salaryCurrency),
      type: 'string',
    },
    salaryMinValue: {
      title: intl.formatMessage(messages.salaryMinValue),
      type: 'number',
    },
    salaryMaxValue: {
      title: intl.formatMessage(messages.salaryMaxValue),
      type: 'number',
    },
    salaryUnitText: {
      title: intl.formatMessage(messages.salaryUnitText),
      choices: [
        ['HOUR', intl.formatMessage(messages.salaryUnitTextPerHour)],
        ['DAY', intl.formatMessage(messages.salaryUnitTextPerDay)],
        ['WEEK', intl.formatMessage(messages.salaryUnitTextPerWeek)],
        ['MONTH', intl.formatMessage(messages.salaryUnitTextPerMonth)],
        ['YEAR', intl.formatMessage(messages.salaryUnitTextPerYear)],
      ],
    },
  },
  required: ['title', 'description', 'datePosted', 'organizationName'],
});

/**
 * Get default values for JobPosting from content
 *
 * Extracts relevant data from the current content object
 * to pre-populate the JobPosting form.
 */
export const getJobPostingDefaults = (content: any, config: any) => {
  return {
    title: content.title || '',
    description: convertStringToSlate(content.description),
    datePosted: content.created || new Date().toISOString(),
    validThrough: '',
    employmentType: [],
    organizationName: '',
    organizationUrl: '',
    organizationLogo: '',
    homeoffice: false,
    applicantLocationRequirements: [],
    streetAddress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: '',
    salaryCurrency: 'EUR',
    salaryMinValue: '',
    salaryMaxValue: '',
    salaryUnitText: 'YEAR',
  };
};

/**
 * Convert form data to JSON-LD
 *
 * Transforms the form data structure into schema.org
 * compliant JSON-LD format.
 */
export const jobPostingToJsonLd = (formData: any) => {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: formData.title,
    // Extract HTML from richtext field using helper
    description: convertSlateToString(formData.description),
    datePosted: formData.datePosted,
  };

  // Add optional fields only if they have values
  if (formData.validThrough) {
    jsonLd.validThrough = formData.validThrough;
  }

  if (formData.employmentType && formData.employmentType.length > 0) {
    jsonLd.employmentType = formData.employmentType;
  }

  // Add jobLocationType if homeoffice is true
  if (formData.homeoffice) {
    jsonLd.jobLocationType = 'TELECOMMUTE';
  }

  // Add applicant location requirements (always Country type per Google spec)
  if (
    formData.applicantLocationRequirements &&
    formData.applicantLocationRequirements.length > 0
  ) {
    jsonLd.applicantLocationRequirements =
      formData.applicantLocationRequirements
        .filter((item: any) => item && item.name)
        .map((item: any) => ({
          '@type': 'Country',
          name: item.name,
        }));
  }

  // Add hiring organization (required)
  const organization: any = {
    '@type': 'Organization',
    name: formData.organizationName,
  };

  if (formData.organizationUrl) {
    organization.sameAs = formData.organizationUrl;
  }

  if (formData.organizationLogo) {
    organization.logo = formData.organizationLogo;
  }

  jsonLd.hiringOrganization = organization;

  // Add job location if any address field is filled
  if (
    formData.streetAddress ||
    formData.addressLocality ||
    formData.addressRegion ||
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
    if (formData.addressRegion) {
      address.addressRegion = formData.addressRegion;
    }
    if (formData.postalCode) {
      address.postalCode = formData.postalCode;
    }
    if (formData.addressCountry) {
      address.addressCountry = formData.addressCountry;
    }

    jsonLd.jobLocation = {
      '@type': 'Place',
      address: address,
    };
  }

  // Add salary if values are provided
  if (
    formData.salaryCurrency &&
    (formData.salaryMinValue || formData.salaryMaxValue)
  ) {
    const salary: any = {
      '@type': 'MonetaryAmount',
      currency: formData.salaryCurrency,
    };

    // Use range if both min and max are provided
    if (formData.salaryMinValue && formData.salaryMaxValue) {
      salary.value = {
        '@type': 'QuantitativeValue',
        minValue: formData.salaryMinValue,
        maxValue: formData.salaryMaxValue,
      };
    } else if (formData.salaryMinValue) {
      salary.value = {
        '@type': 'QuantitativeValue',
        value: formData.salaryMinValue,
      };
    } else if (formData.salaryMaxValue) {
      salary.value = {
        '@type': 'QuantitativeValue',
        value: formData.salaryMaxValue,
      };
    }

    if (formData.salaryUnitText) {
      salary.value.unitText = formData.salaryUnitText;
    }

    jsonLd.baseSalary = salary;
  }

  return jsonLd;
};

/**
 * Convert JSON-LD back to form data
 *
 * Transforms JSON-LD structure back into form-editable format
 * for editing existing Rich Results.
 */
export const jsonLdToJobPostingForm = (jsonLd: any) => {
  const formData = {
    title: jsonLd.title || '',
    // Convert HTML to richtext format (JSON-LD has formatted HTML)
    description: convertHtmlToSlate(jsonLd.description),
    datePosted: jsonLd.datePosted || '',
    validThrough: jsonLd.validThrough || '',
    // Ensure employmentType is always an array (JSON-LD allows single value or array)
    employmentType: jsonLd.employmentType
      ? Array.isArray(jsonLd.employmentType)
        ? jsonLd.employmentType
        : [jsonLd.employmentType]
      : [],
    organizationName: jsonLd.hiringOrganization?.name || '',
    organizationUrl: jsonLd.hiringOrganization?.sameAs || '',
    organizationLogo: jsonLd.hiringOrganization?.logo || '',
    homeoffice: jsonLd.jobLocationType === 'TELECOMMUTE',
    applicantLocationRequirements:
      jsonLd.applicantLocationRequirements?.map((item: any) => ({
        '@id': uuid(), // Add @id for object_list widget tracking
        name: item.name || '',
      })) || [],
    streetAddress: jsonLd.jobLocation?.address?.streetAddress || '',
    addressLocality: jsonLd.jobLocation?.address?.addressLocality || '',
    addressRegion: jsonLd.jobLocation?.address?.addressRegion || '',
    postalCode: jsonLd.jobLocation?.address?.postalCode || '',
    addressCountry: jsonLd.jobLocation?.address?.addressCountry || '',
    salaryCurrency: jsonLd.baseSalary?.currency || 'EUR',
    salaryMinValue:
      jsonLd.baseSalary?.value?.minValue ||
      jsonLd.baseSalary?.value?.value ||
      '',
    salaryMaxValue: jsonLd.baseSalary?.value?.maxValue || '',
    salaryUnitText: jsonLd.baseSalary?.value?.unitText || 'YEAR',
  };

  return formData;
};

/**
 * Validate JobPosting Rich Result
 *
 * Checks conditional requirements:
 * - Either a physical job location OR remote work (homeoffice) is required
 * - For remote positions, applicantLocationRequirements must be provided
 */
export const validateJobPosting = (
  formData: any,
  intl: any,
): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};

  // Check if job location is provided (any address field)
  const hasJobLocation =
    (formData.streetAddress && formData.streetAddress.trim() !== '') ||
    (formData.addressLocality && formData.addressLocality.trim() !== '') ||
    (formData.addressRegion && formData.addressRegion.trim() !== '') ||
    (formData.postalCode && formData.postalCode.trim() !== '') ||
    (formData.addressCountry && formData.addressCountry.trim() !== '');

  // Check if it's a remote/homeoffice position
  const isRemote = formData.homeoffice === true;

  // Check if applicant location requirements are provided
  const hasApplicantLocationRequirements =
    formData.applicantLocationRequirements &&
    Array.isArray(formData.applicantLocationRequirements) &&
    formData.applicantLocationRequirements.some(
      (item: any) => item && item.name && item.name.trim() !== '',
    );

  // Validation logic:
  // 1. If not remote and no job location -> error
  // 2. If remote but no applicant location requirements -> error
  if (!isRemote && !hasJobLocation) {
    // Not remote and no physical location
    const locationError = intl.formatMessage(messages.locationRequired);
    errors.streetAddress = [locationError];
    errors.homeoffice = [locationError];
  } else if (isRemote && !hasApplicantLocationRequirements) {
    // Remote but no applicant location requirements
    const applicantLocationError = intl.formatMessage(
      messages.applicantLocationRequired,
    );
    errors.applicantLocationRequirements = [applicantLocationError];
  }

  return errors;
};

/**
 * Register JobPosting Rich Result type
 *
 * This registers the type for volto-richresults.
 */
export const registerJobPostingRichResultType = (config: ConfigType) => {
  config = registerRichResultType(config, {
    id: 'JobPosting',
    title: 'Job Posting',
    description:
      'Job posting with organization, location, and salary information',
    schema: JobPostingSchema,
    getDefaults: getJobPostingDefaults,
    toJsonLd: jobPostingToJsonLd,
    fromJsonLd: jsonLdToJobPostingForm,
    validate: validateJobPosting,
    availableFor: ['*'], // Available for all content types
  });

  return config;
};

import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { registerRichResultType } from '../registry';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  event: {
    id: 'Event',
    defaultMessage: 'Event',
  },
  name: {
    id: 'Event Name',
    defaultMessage: 'Event Name',
  },
  nameDescription: {
    id: 'The full title of the event',
    defaultMessage: 'The full title of the event',
  },
  description: {
    id: 'Event Description',
    defaultMessage: 'Event Description',
  },
  descriptionDescription: {
    id: 'A description of the event',
    defaultMessage: 'A description of the event',
  },
  startDate: {
    id: 'Start Date',
    defaultMessage: 'Start Date',
  },
  startDateDescription: {
    id: 'When the event starts (date and time)',
    defaultMessage: 'When the event starts (date and time)',
  },
  endDate: {
    id: 'End Date',
    defaultMessage: 'End Date',
  },
  endDateDescription: {
    id: 'When the event ends (date and time)',
    defaultMessage: 'When the event ends (date and time)',
  },
  eventStatus: {
    id: 'Event Status',
    defaultMessage: 'Event Status',
  },
  eventStatusDescription: {
    id: 'Current status of the event',
    defaultMessage: 'Current status of the event',
  },
  eventStatusScheduled: {
    id: 'Scheduled',
    defaultMessage: 'Scheduled',
  },
  eventStatusCancelled: {
    id: 'Cancelled',
    defaultMessage: 'Cancelled',
  },
  eventStatusPostponed: {
    id: 'Postponed',
    defaultMessage: 'Postponed',
  },
  eventStatusRescheduled: {
    id: 'Rescheduled',
    defaultMessage: 'Rescheduled',
  },
  previousStartDate: {
    id: 'Previous Start Date',
    defaultMessage: 'Previous Start Date',
  },
  previousStartDateDescription: {
    id: 'Original start date if event was rescheduled',
    defaultMessage: 'Original start date if event was rescheduled',
  },
  image: {
    id: 'Event Image',
    defaultMessage: 'Event Image',
  },
  imageDescription: {
    id: 'URL of an image for the event',
    defaultMessage: 'URL of an image for the event',
  },
  locationName: {
    id: 'Venue Name',
    defaultMessage: 'Venue Name',
  },
  locationNameDescription: {
    id: 'Name of the venue or location',
    defaultMessage: 'Name of the venue or location',
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
  organizer: {
    id: 'Organizer',
    defaultMessage: 'Organizer',
  },
  organizerDescription: {
    id: 'Organization or person hosting the event',
    defaultMessage: 'Organization or person hosting the event',
  },
  organizerName: {
    id: 'Organizer Name',
    defaultMessage: 'Organizer Name',
  },
  organizerUrl: {
    id: 'Organizer URL',
    defaultMessage: 'Organizer URL',
  },
  performer: {
    id: 'Performers',
    defaultMessage: 'Performers',
  },
  performerDescription: {
    id: 'Artists, musicians, or speakers participating',
    defaultMessage: 'Artists, musicians, or speakers participating',
  },
  performerName: {
    id: 'Performer Name',
    defaultMessage: 'Performer Name',
  },
  performerType: {
    id: 'Performer Type',
    defaultMessage: 'Performer Type',
  },
  performerTypePerson: {
    id: 'Person',
    defaultMessage: 'Person',
  },
  performerTypeGroup: {
    id: 'Performing Group',
    defaultMessage: 'Performing Group',
  },
  offerUrl: {
    id: 'Ticket URL',
    defaultMessage: 'Ticket URL',
  },
  offerUrlDescription: {
    id: 'URL where tickets can be purchased',
    defaultMessage: 'URL where tickets can be purchased',
  },
  offerPrice: {
    id: 'Ticket Price',
    defaultMessage: 'Ticket Price',
  },
  offerPriceDescription: {
    id: 'Lowest ticket price (0 if free)',
    defaultMessage: 'Lowest ticket price (0 if free)',
  },
  offerCurrency: {
    id: 'Currency',
    defaultMessage: 'Currency',
  },
  offerCurrencyDescription: {
    id: 'Currency code (e.g., EUR, USD)',
    defaultMessage: 'Currency code (e.g., EUR, USD)',
  },
  offerAvailability: {
    id: 'Ticket Availability',
    defaultMessage: 'Ticket Availability',
  },
  offerAvailabilityDescription: {
    id: 'Current availability of tickets',
    defaultMessage: 'Current availability of tickets',
  },
  availabilityInStock: {
    id: 'In Stock',
    defaultMessage: 'In Stock',
  },
  availabilitySoldOut: {
    id: 'Sold Out',
    defaultMessage: 'Sold Out',
  },
  availabilityPreOrder: {
    id: 'Pre-Order',
    defaultMessage: 'Pre-Order',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  dateTimeFieldset: {
    id: 'Date & Time',
    defaultMessage: 'Date & Time',
  },
  locationFieldset: {
    id: 'Location',
    defaultMessage: 'Location',
  },
  organizerFieldset: {
    id: 'Organizer & Performers',
    defaultMessage: 'Organizer & Performers',
  },
  ticketsFieldset: {
    id: 'Tickets',
    defaultMessage: 'Tickets',
  },
});

/**
 * Event Rich Result Schema
 *
 * Defines the form schema for Event structured data.
 * Based on schema.org Event type.
 * https://developers.google.com/search/docs/appearance/structured-data/event
 */
export const EventSchema = (intl: IntlShape) => ({
  title: intl.formatMessage(messages.event),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['name', 'description', 'image', 'eventStatus'],
    },
    {
      id: 'datetime',
      title: intl.formatMessage(messages.dateTimeFieldset),
      fields: ['startDate', 'endDate', 'previousStartDate'],
    },
    {
      id: 'location',
      title: intl.formatMessage(messages.locationFieldset),
      fields: [
        'locationName',
        'streetAddress',
        'addressLocality',
        'addressRegion',
        'postalCode',
        'addressCountry',
      ],
    },
    {
      id: 'organizer',
      title: intl.formatMessage(messages.organizerFieldset),
      fields: ['organizerName', 'organizerUrl', 'performer'],
    },
    {
      id: 'tickets',
      title: intl.formatMessage(messages.ticketsFieldset),
      fields: ['offerUrl', 'offerPrice', 'offerCurrency', 'offerAvailability'],
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
    eventStatus: {
      title: intl.formatMessage(messages.eventStatus),
      description: intl.formatMessage(messages.eventStatusDescription),
      choices: [
        ['EventScheduled', intl.formatMessage(messages.eventStatusScheduled)],
        ['EventCancelled', intl.formatMessage(messages.eventStatusCancelled)],
        ['EventPostponed', intl.formatMessage(messages.eventStatusPostponed)],
        [
          'EventRescheduled',
          intl.formatMessage(messages.eventStatusRescheduled),
        ],
      ],
      default: 'EventScheduled',
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
    previousStartDate: {
      title: intl.formatMessage(messages.previousStartDate),
      description: intl.formatMessage(messages.previousStartDateDescription),
      widget: 'datetime',
    },
    locationName: {
      title: intl.formatMessage(messages.locationName),
      description: intl.formatMessage(messages.locationNameDescription),
      type: 'string',
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
    organizerName: {
      title: intl.formatMessage(messages.organizerName),
      description: intl.formatMessage(messages.organizerDescription),
      type: 'string',
    },
    organizerUrl: {
      title: intl.formatMessage(messages.organizerUrl),
      type: 'string',
      widget: 'url',
    },
    performer: {
      title: intl.formatMessage(messages.performer),
      description: intl.formatMessage(messages.performerDescription),
      widget: 'object_list',
      schema: {
        title: intl.formatMessage(messages.performer),
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['type', 'name'],
          },
        ],
        properties: {
          type: {
            title: intl.formatMessage(messages.performerType),
            choices: [
              ['Person', intl.formatMessage(messages.performerTypePerson)],
              [
                'PerformingGroup',
                intl.formatMessage(messages.performerTypeGroup),
              ],
            ],
            default: 'Person',
          },
          name: {
            title: intl.formatMessage(messages.performerName),
            type: 'string',
          },
        },
        required: ['name'],
      },
    },
    offerUrl: {
      title: intl.formatMessage(messages.offerUrl),
      description: intl.formatMessage(messages.offerUrlDescription),
      type: 'string',
      widget: 'url',
    },
    offerPrice: {
      title: intl.formatMessage(messages.offerPrice),
      description: intl.formatMessage(messages.offerPriceDescription),
      type: 'number',
    },
    offerCurrency: {
      title: intl.formatMessage(messages.offerCurrency),
      description: intl.formatMessage(messages.offerCurrencyDescription),
      type: 'string',
      default: 'EUR',
    },
    offerAvailability: {
      title: intl.formatMessage(messages.offerAvailability),
      description: intl.formatMessage(messages.offerAvailabilityDescription),
      choices: [
        ['InStock', intl.formatMessage(messages.availabilityInStock)],
        ['SoldOut', intl.formatMessage(messages.availabilitySoldOut)],
        ['PreOrder', intl.formatMessage(messages.availabilityPreOrder)],
      ],
    },
  },
  required: ['name', 'startDate', 'locationName'],
});

/**
 * Get default values for Event from content
 *
 * Extracts relevant data from the current content object
 * to pre-populate the Event form.
 */
export const getEventDefaults = (content: any, config: any) => {
  return {
    name: content.title || '',
    description: content.description || '',
    image: '',
    eventStatus: 'EventScheduled',
    startDate: content.start || '',
    endDate: content.end || '',
    previousStartDate: '',
    locationName: content.location || '',
    streetAddress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: '',
    organizerName: content.contact_name || '',
    organizerUrl: '',
    performer: [],
    offerUrl: '',
    offerPrice: '',
    offerCurrency: 'EUR',
    offerAvailability: '',
  };
};

/**
 * Convert form data to JSON-LD
 *
 * Transforms the form data structure into schema.org
 * compliant JSON-LD format.
 */
export const eventToJsonLd = (formData: any) => {
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: formData.name,
    startDate: formData.startDate,
  };

  // Add description
  if (formData.description) {
    jsonLd.description = formData.description;
  }

  // Add image
  if (formData.image) {
    jsonLd.image = formData.image;
  }

  // Add event status
  if (formData.eventStatus) {
    jsonLd.eventStatus = `https://schema.org/${formData.eventStatus}`;
  }

  // Add end date
  if (formData.endDate) {
    jsonLd.endDate = formData.endDate;
  }

  // Add previous start date (for rescheduled events)
  if (formData.previousStartDate) {
    jsonLd.previousStartDate = formData.previousStartDate;
  }

  // Add location
  if (formData.locationName) {
    jsonLd.location = {
      '@type': 'Place',
      name: formData.locationName,
    };

    // Add address if any address field is filled
    if (
      formData.streetAddress ||
      formData.addressLocality ||
      formData.addressRegion ||
      formData.postalCode ||
      formData.addressCountry
    ) {
      jsonLd.location.address = {
        '@type': 'PostalAddress',
      };

      if (formData.streetAddress) {
        jsonLd.location.address.streetAddress = formData.streetAddress;
      }
      if (formData.addressLocality) {
        jsonLd.location.address.addressLocality = formData.addressLocality;
      }
      if (formData.addressRegion) {
        jsonLd.location.address.addressRegion = formData.addressRegion;
      }
      if (formData.postalCode) {
        jsonLd.location.address.postalCode = formData.postalCode;
      }
      if (formData.addressCountry) {
        jsonLd.location.address.addressCountry = formData.addressCountry;
      }
    }
  }

  // Add organizer
  if (formData.organizerName) {
    jsonLd.organizer = {
      '@type': 'Organization',
      name: formData.organizerName,
    };
    if (formData.organizerUrl) {
      jsonLd.organizer.url = formData.organizerUrl;
    }
  }

  // Add performers
  if (formData.performer && formData.performer.length > 0) {
    jsonLd.performer = formData.performer
      .filter((item: any) => item && item.name)
      .map((item: any) => ({
        '@type': item.type || 'Person',
        name: item.name,
      }));

    if (jsonLd.performer.length === 0) {
      delete jsonLd.performer;
    }
  }

  // Add offers (ticket information)
  if (formData.offerUrl || formData.offerPrice !== undefined) {
    jsonLd.offers = {
      '@type': 'Offer',
    };

    if (formData.offerUrl) {
      jsonLd.offers.url = formData.offerUrl;
    }

    if (formData.offerPrice !== undefined && formData.offerPrice !== '') {
      jsonLd.offers.price = formData.offerPrice;
    }

    if (formData.offerCurrency) {
      jsonLd.offers.priceCurrency = formData.offerCurrency;
    }

    if (formData.offerAvailability) {
      jsonLd.offers.availability = `https://schema.org/${formData.offerAvailability}`;
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
export const jsonLdToEventForm = (jsonLd: any) => {
  // Extract event status (remove schema.org prefix)
  let eventStatus = 'EventScheduled';
  if (jsonLd.eventStatus) {
    eventStatus = jsonLd.eventStatus.replace('https://schema.org/', '');
  }

  // Extract location
  let locationName = '';
  let streetAddress = '';
  let addressLocality = '';
  let addressRegion = '';
  let postalCode = '';
  let addressCountry = '';

  if (jsonLd.location) {
    locationName = jsonLd.location.name || '';
    if (jsonLd.location.address) {
      streetAddress = jsonLd.location.address.streetAddress || '';
      addressLocality = jsonLd.location.address.addressLocality || '';
      addressRegion = jsonLd.location.address.addressRegion || '';
      postalCode = jsonLd.location.address.postalCode || '';
      addressCountry = jsonLd.location.address.addressCountry || '';
    }
  }

  // Extract organizer
  let organizerName = '';
  let organizerUrl = '';
  if (jsonLd.organizer) {
    organizerName = jsonLd.organizer.name || '';
    organizerUrl = jsonLd.organizer.url || '';
  }

  // Extract performers
  let performer: any[] = [];
  if (jsonLd.performer) {
    const performers = Array.isArray(jsonLd.performer)
      ? jsonLd.performer
      : [jsonLd.performer];
    performer = performers
      .filter((item: any) => item && item.name)
      .map((item: any) => ({
        '@id': uuid(),
        type: item['@type'] || 'Person',
        name: item.name || '',
      }));
  }

  // Extract offers
  let offerUrl = '';
  let offerPrice: number | string = '';
  let offerCurrency = 'EUR';
  let offerAvailability = '';

  if (jsonLd.offers) {
    offerUrl = jsonLd.offers.url || '';
    offerPrice = jsonLd.offers.price !== undefined ? jsonLd.offers.price : '';
    offerCurrency = jsonLd.offers.priceCurrency || 'EUR';
    if (jsonLd.offers.availability) {
      offerAvailability = jsonLd.offers.availability.replace(
        'https://schema.org/',
        '',
      );
    }
  }

  return {
    name: jsonLd.name || '',
    description: jsonLd.description || '',
    image: jsonLd.image || '',
    eventStatus,
    startDate: jsonLd.startDate || '',
    endDate: jsonLd.endDate || '',
    previousStartDate: jsonLd.previousStartDate || '',
    locationName,
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
    organizerName,
    organizerUrl,
    performer,
    offerUrl,
    offerPrice,
    offerCurrency,
    offerAvailability,
  };
};

/**
 * Register Event Rich Result type
 *
 * This registers the type for volto-richresults.
 */
export const registerEventRichResultType = (config: any) => {
  config = registerRichResultType(config, {
    id: 'Event',
    title: 'Event',
    description:
      'Structured data for events, enabling rich event listings in Google Search',
    schema: EventSchema,
    getDefaults: getEventDefaults,
    toJsonLd: eventToJsonLd,
    fromJsonLd: jsonLdToEventForm,
    availableFor: ['Event', '*'], // Available for Event content type and all others
  });

  return config;
};

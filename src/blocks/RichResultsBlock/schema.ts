import { defineMessages } from 'react-intl';

const messages = defineMessages({
  schemaTitle: {
    id: 'Rich Results Block',
    defaultMessage: 'Rich Results Block',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
});

const Schema = ({ intl }: any) => ({
  title: intl.formatMessage(messages.schemaTitle),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: [],
    },
  ],
  properties: {},
  required: [],
});

export default Schema;

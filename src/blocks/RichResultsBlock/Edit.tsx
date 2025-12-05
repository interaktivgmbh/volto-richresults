import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { BlockDataForm } from '@plone/volto/components';
import RichResultsWidget from '../../components/RichResultsWidget';
import Schema from './schema';
import './styles.css';

const messages = defineMessages({
  title: {
    id: 'Rich Results (Structured Data)',
    defaultMessage: 'Rich Results (Structured Data)',
  },
  description: {
    id: 'Configure schema.org structured data for this content. This data will be rendered as JSON-LD in the page head.',
    defaultMessage:
      'Configure schema.org structured data for this content. This data will be rendered as JSON-LD in the page head.',
  },
  widgetTitle: {
    id: 'Rich Results',
    defaultMessage: 'Rich Results',
  },
  widgetDescription: {
    id: 'Add and configure Rich Results for this content',
    defaultMessage: 'Add and configure Rich Results for this content',
  },
  sidebarTitle: {
    id: 'Rich Results Block',
    defaultMessage: 'Rich Results Block',
  },
});

interface EditProps {
  data: any;
  block: string;
  onChangeBlock: (block: string, data: any) => void;
  selected: boolean;
  properties: any;
  onChangeField: (id: string, value: any) => void;
}

/**
 * Edit component for Rich Results Block
 * This block allows editing Rich Results metadata directly in the content
 */
const Edit: React.FC<EditProps> = ({
  data,
  block,
  onChangeBlock,
  selected,
  properties,
  onChangeField,
}) => {
  const intl = useIntl();
  const richresults = properties?.richresults || [];

  const handleChange = (id: string, value: any) => {
    // Update the content's richresults field directly
    if (onChangeField) {
      onChangeField('richresults', value);
    }
  };

  return (
    <>
      <div className="rich-results-block">
        <div className="block-header">
          <h3>{intl.formatMessage(messages.title)}</h3>
          <p>{intl.formatMessage(messages.description)}</p>
        </div>

        <RichResultsWidget
          id="richresults"
          title={intl.formatMessage(messages.widgetTitle)}
          description={intl.formatMessage(messages.widgetDescription)}
          value={richresults}
          onChange={handleChange}
          formData={properties}
        />
      </div>

      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={Schema({ intl })}
          title={intl.formatMessage(messages.sidebarTitle)}
          onChangeBlock={onChangeBlock}
          onChangeField={(id: string, value: any) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;

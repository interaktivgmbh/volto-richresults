import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  Button,
  Segment,
  Table,
  Dropdown,
  Message,
  Loader,
} from 'semantic-ui-react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getVocabulary } from '@plone/volto/actions/vocabularies/vocabularies';
import config from '@plone/volto/registry';
import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';

const messages = defineMessages({
  richResultsConfig: {
    id: 'Rich Results Configuration',
    defaultMessage: 'Rich Results Configuration',
  },
  contentType: {
    id: 'Content Type',
    defaultMessage: 'Content Type',
  },
  availableTypes: {
    id: 'Available Rich Result Types',
    defaultMessage: 'Available Rich Result Types',
  },
  addContentType: {
    id: 'Add Content Type',
    defaultMessage: 'Add Content Type',
  },
  selectContentType: {
    id: 'Select content type...',
    defaultMessage: 'Select content type...',
  },
  selectRichResultTypes: {
    id: 'Select Rich Result types...',
    defaultMessage: 'Select Rich Result types...',
  },
  noConfiguration: {
    id: 'No configuration set. Add content types to configure which Rich Result types are available.',
    defaultMessage:
      'No configuration set. Add content types to configure which Rich Result types are available.',
  },
  actions: {
    id: 'Actions',
    defaultMessage: 'Actions',
  },
});

interface RichResultsConfigWidgetProps {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
  error?: string[];
  value: any;
  onChange: (id: string, value: any) => void;
  fieldSet?: string;
}

/**
 * Rich Results Config Widget
 *
 * Allows configuring which Rich Result types are available for which content types.
 * Stores configuration in format: {"selectable_types": {"Document": ["Article"], ...}}
 */
const RichResultsConfigWidget: React.FC<RichResultsConfigWidgetProps> = (
  props,
) => {
  const {
    id,
    title,
    description,
    required = false,
    error,
    value = {},
    onChange,
  } = props;

  const intl = useIntl();
  const dispatch = useDispatch();
  const [selectedContentType, setSelectedContentType] = useState<string | null>(
    null,
  );

  const vocabularyName =
    'interaktiv.voltorichresults.vocabularies.richresults_contenttypes';

  // Get vocabulary from Redux store
  const vocabularyData = useSelector(
    (state: any) => state.vocabularies?.[vocabularyName],
  );

  // Parse the current configuration
  const currentConfig = value?.selectable_types || {};

  // Get all registered Rich Result types
  const registeredTypes = config.settings.richresults?.types || {};
  const richResultTypeOptions = Object.keys(registeredTypes).map((typeId) => ({
    key: typeId,
    text: registeredTypes[typeId].title,
    value: typeId,
  }));

  // Fetch vocabulary on mount
  useEffect(() => {
    dispatch(getVocabulary({ vocabNameOrURL: vocabularyName }));
  }, [dispatch, vocabularyName]);

  // Map vocabulary data to dropdown options
  const availableContentTypes =
    vocabularyData?.items?.map((item: any) => ({
      key: item.value,
      text: item.label,
      value: item.value,
    })) || [];

  // Create value-to-label mapping for display
  const contentTypeLabels: Record<string, string> = Object.fromEntries(
    vocabularyData?.items?.map((item: any) => [item.value, item.label]) || [],
  );

  // Filter out already configured content types
  const contentTypeOptions = availableContentTypes.filter(
    (ct: any) => !currentConfig[ct.value],
  );

  const isLoadingContentTypes = vocabularyData?.loading || false;

  const handleAddContentType = () => {
    if (!selectedContentType) return;

    const newConfig = {
      ...currentConfig,
      [selectedContentType]: [],
    };

    onChange(id, { selectable_types: newConfig });
    setSelectedContentType(null);
  };

  const handleRemoveContentType = (contentType: string) => {
    const newConfig = { ...currentConfig };
    delete newConfig[contentType];
    onChange(id, { selectable_types: newConfig });
  };

  const handleUpdateTypes = (contentType: string, selectedTypes: string[]) => {
    const newConfig = {
      ...currentConfig,
      [contentType]: selectedTypes,
    };
    onChange(id, { selectable_types: newConfig });
  };

  const configuredContentTypes = Object.keys(currentConfig);

  return (
    <FormFieldWrapper
      id={id}
      title={title}
      description={description}
      required={required}
      error={error}
    >
      <Segment className="rich-results-config-widget">
        {configuredContentTypes.length > 0 ? (
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={4}>
                  {intl.formatMessage(messages.contentType)}
                </Table.HeaderCell>
                <Table.HeaderCell width={10}>
                  {intl.formatMessage(messages.availableTypes)}
                </Table.HeaderCell>
                <Table.HeaderCell width={2}>
                  {intl.formatMessage(messages.actions)}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {configuredContentTypes.map((contentType) => (
                <Table.Row key={contentType}>
                  <Table.Cell>
                    <strong>
                      {contentTypeLabels[contentType] || contentType}
                    </strong>
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={intl.formatMessage(
                        messages.selectRichResultTypes,
                      )}
                      fluid
                      multiple
                      selection
                      options={richResultTypeOptions}
                      value={currentConfig[contentType] || []}
                      onChange={(e, { value }) =>
                        handleUpdateTypes(contentType, value as string[])
                      }
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button
                      type="button"
                      icon
                      basic
                      compact
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveContentType(contentType);
                      }}
                      title="Remove"
                    >
                      <Icon name={deleteSVG} size="18px" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Message info>
            <p>{intl.formatMessage(messages.noConfiguration)}</p>
          </Message>
        )}

        {isLoadingContentTypes ? (
          <Segment>
            <Loader active inline="centered">
              Loading content types...
            </Loader>
          </Segment>
        ) : (
          contentTypeOptions.length > 0 && (
            <Segment>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Dropdown
                  placeholder={intl.formatMessage(messages.selectContentType)}
                  selection
                  clearable
                  options={contentTypeOptions}
                  value={selectedContentType || undefined}
                  onChange={(e, { value }) =>
                    setSelectedContentType((value as string) || null)
                  }
                  style={{ flex: 1 }}
                />
                <Button
                  type="button"
                  primary
                  icon
                  labelPosition="left"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddContentType();
                  }}
                  disabled={!selectedContentType}
                >
                  <Icon name={addSVG} size="18px" />
                  {intl.formatMessage(messages.addContentType)}
                </Button>
              </div>
            </Segment>
          )
        )}
      </Segment>
    </FormFieldWrapper>
  );
};

export default RichResultsConfigWidget;

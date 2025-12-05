import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Segment, List, Message, Dropdown } from 'semantic-ui-react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import config from '@plone/volto/registry';
import { getAvailableRichResultTypes } from '../registry';
import { getRichResultsConfig } from '../actions/richresults';
import RichResultEditModal from './RichResultEditModal';
import GoogleRichResultsTest from './GoogleRichResultsTest';
import penSVG from '@plone/volto/icons/pen.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import addSVG from '@plone/volto/icons/add.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

const messages = defineMessages({
  richResults: {
    id: 'Rich Results',
    defaultMessage: 'Rich Results',
  },
  noRichResults: {
    id: 'No Rich Results configured. Add one to improve SEO.',
    defaultMessage: 'No Rich Results configured. Add one to improve SEO.',
  },
  addRichResult: {
    id: 'Add Rich Result',
    defaultMessage: 'Add Rich Result',
  },
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  insufficientPermissions: {
    id: 'You do not have permission to edit Rich Results.',
    defaultMessage: 'You do not have permission to edit Rich Results.',
  },
  configLoadError: {
    id: 'Unable to load Rich Results configuration.',
    defaultMessage: 'Unable to load Rich Results configuration.',
  },
  selectType: {
    id: 'Select type...',
    defaultMessage: 'Select type...',
  },
});

interface RichResultsWidgetProps {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
  error?: string[];
  value: any[];
  onChange: (id: string, value: any[]) => void;
  fieldSet?: string;
  formData?: any; // Full content being edited
  wrapped?: boolean; // Render with FormFieldWrapper container (default: true)
}

/**
 * Rich Results Widget
 *
 * Custom Volto widget for managing Rich Results (structured data).
 * Displays configured Rich Results and provides UI for adding/editing/deleting.
 */
const RichResultsWidget: React.FC<RichResultsWidgetProps> = (props) => {
  const {
    id,
    title,
    description,
    required = false,
    error,
    value = [],
    onChange,
    formData = {},
    wrapped = false,
  } = props;

  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const [editingType, setEditingType] = useState<string | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);

  // Get Rich Results config from Redux store
  const richResultsConfigData = useSelector(
    (state: any) => state.richResultsConfig,
  );

  // Fetch config on mount
  useEffect(() => {
    dispatch(getRichResultsConfig());
  }, [dispatch]);

  // Extract selectable_types from config data
  const selectableTypes = richResultsConfigData?.data?.selectable_types;

  const richResults = Array.isArray(value) ? value : [];

  // Helper function: Get the type ID for a Rich Result item
  // Maps JSON-LD @type to registered type ID (e.g., ProfilePage -> Person)
  const getTypeId = (item: any) => {
    if (item['@type'] === 'ProfilePage' && item.mainEntity) {
      return item.mainEntity['@type'] || 'ProfilePage';
    }

    return item['@type'];
  };

  // Map JSON-LD @type to registered type ID for checking configured types
  const configuredTypes = richResults.map((item: any) => getTypeId(item));

  // Get portal type from formData (edit mode) or URL query params (add mode)
  const getPortalType = () => {
    // Try to get from formData first (edit mode)
    if (formData['@type']) {
      return formData['@type'];
    }
    // Fall back to URL query parameter (add mode)
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('type') || '';
  };

  const portalType = getPortalType();
  const allTypes = getAvailableRichResultTypes(
    config,
    portalType,
    selectableTypes,
  );

  const availableTypes = allTypes.filter(
    (typeConfig) => !configuredTypes.includes(typeConfig.id),
  );

  const handleAdd = (typeId: string) => {
    setEditingType(typeId);
  };

  const handleSave = (typeId: string, formData: any) => {
    const typeConfig = config.settings.richresults?.types[typeId];
    if (!typeConfig) return;

    const jsonLd = typeConfig.toJsonLd(formData);

    // Update or add - use getTypeId to handle ProfilePage -> Person mapping
    const existingIndex = richResults.findIndex(
      (item: any) => getTypeId(item) === typeId,
    );
    let newValue: any[];

    if (existingIndex >= 0) {
      newValue = [...richResults];
      newValue[existingIndex] = jsonLd;
    } else {
      newValue = [...richResults, jsonLd];
    }

    onChange(id, newValue);
    setEditingType(null);
  };

  const handleDelete = (typeId: string) => {
    const newValue = richResults.filter(
      (item: any) => getTypeId(item) !== typeId,
    );
    onChange(id, newValue);
  };

  const handleEdit = (typeId: string) => {
    setEditingType(typeId);
  };

  const getDisplayText = (item: any) => {
    // For ProfilePage, extract data from mainEntity
    if (item['@type'] === 'ProfilePage' && item.mainEntity) {
      return item.mainEntity.name || item.mainEntity.title || 'ProfilePage';
    }

    return item.headline || item.name || item.title || `${item['@type']}`;
  };

  // Check for permission or configuration errors
  const hasError = richResultsConfigData?.error;
  const isPermissionError =
    hasError && richResultsConfigData.error.status === 401;
  const isConfigError = hasError && !isPermissionError;

  return (
    <FormFieldWrapper
      id={id}
      title={title}
      description={description}
      required={required}
      error={error}
      wrapped={wrapped}
    >
      {/* Show error message if user doesn't have permission */}
      {isPermissionError && (
        <Message warning>
          <p>{intl.formatMessage(messages.insufficientPermissions)}</p>
        </Message>
      )}

      {/* Show error message if config couldn't be loaded */}
      {isConfigError && (
        <Message error>
          <p>{intl.formatMessage(messages.configLoadError)}</p>
        </Message>
      )}

      {/* Only show widget form if no errors */}
      {!hasError && (
        <Segment className="rich-results-widget">
          {richResults.length > 0 ? (
            <>
              <List divided relaxed>
                {richResults.map((item: any, index: number) => {
                  const displayText = getDisplayText(item);
                  const typeId = getTypeId(item);
                  const typeConfig = config.settings.richresults?.types[typeId];

                  return (
                    <List.Item key={`${typeId}-${index}`}>
                      <List.Content floated="right">
                        <Button
                          type="button"
                          icon
                          basic
                          compact
                          size="mini"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEdit(typeId);
                          }}
                          title={intl.formatMessage(messages.edit)}
                          aria-label={intl.formatMessage(messages.edit)}
                        >
                          <Icon name={penSVG} size="18px" />
                        </Button>
                        <Button
                          type="button"
                          icon
                          basic
                          compact
                          size="mini"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(typeId);
                          }}
                          title={intl.formatMessage(messages.delete)}
                          aria-label={intl.formatMessage(messages.delete)}
                        >
                          <Icon name={deleteSVG} size="18px" />
                        </Button>
                      </List.Content>
                      <List.Icon aria-hidden="true">
                        <Icon name={codeSVG} size="24px" />
                      </List.Icon>
                      <List.Content>
                        <List.Header>{typeConfig?.title || typeId}</List.Header>
                        <List.Description>{displayText}</List.Description>
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
              <GoogleRichResultsTest
                richResults={richResults}
                style={{ marginTop: '1rem' }}
              />
            </>
          ) : (
            <Message info>
              <p>{intl.formatMessage(messages.noRichResults)}</p>
            </Message>
          )}

          {/* Show add controls - dropdown if >2 types, buttons otherwise */}
          {availableTypes.length > 0 && (
            <>
              {availableTypes.length > 2 ? (
                <div
                  style={{
                    marginTop: richResults.length > 0 ? '0.5rem' : '0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <Dropdown
                    placeholder={intl.formatMessage(messages.selectType)}
                    selection
                    clearable
                    aria-label={intl.formatMessage(messages.selectType)}
                    icon={<Icon name={downSVG} size="24px" aria-hidden="true" />}
                    options={availableTypes.map((typeConfig) => ({
                      key: typeConfig.id,
                      value: typeConfig.id,
                      text: typeConfig.title,
                    }))}
                    value={selectedTypeId || undefined}
                    onChange={(e, { value }) =>
                      setSelectedTypeId((value as string) || null)
                    }
                    style={{ flex: '1 1 200px', minWidth: '150px' }}
                  />
                  <Button
                    type="button"
                    primary
                    aria-label={intl.formatMessage(messages.addRichResult)}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (selectedTypeId) {
                        handleAdd(selectedTypeId);
                        setSelectedTypeId(null); // Reset selection after adding
                      }
                    }}
                    disabled={!selectedTypeId}
                    style={{ flexShrink: 0 }}
                  >
                    {intl.formatMessage(messages.addRichResult)}
                  </Button>
                </div>
              ) : (
                availableTypes.map((typeConfig) => (
                  <Button
                    key={typeConfig.id}
                    type="button"
                    primary
                    fluid
                    aria-label={`${intl.formatMessage(messages.addRichResult)} - ${typeConfig.title}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAdd(typeConfig.id);
                    }}
                    style={{
                      marginTop: richResults.length > 0 ? '0.5rem' : '0',
                    }}
                  >
                    {intl.formatMessage(messages.addRichResult)} -{' '}
                    {typeConfig.title}
                  </Button>
                ))
              )}
            </>
          )}
        </Segment>
      )}

      {editingType && !hasError && (
        <RichResultEditModal
          typeId={editingType}
          content={formData}
          existingData={richResults.find(
            (item: any) => getTypeId(item) === editingType,
          )}
          onSave={handleSave}
          onClose={() => setEditingType(null)}
        />
      )}
    </FormFieldWrapper>
  );
};

export default RichResultsWidget;

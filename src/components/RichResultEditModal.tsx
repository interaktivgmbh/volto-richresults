import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Modal, Button, Message } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { Form } from '@plone/volto/components';
import Toast from '@plone/volto/components/manage/Toast/Toast';

import config from '@plone/volto/registry';
import { validateFields } from '../helpers/Validation';
import ValidationErrorMessage from './ValidationErrorMessage';

const messages = defineMessages({
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
  add: {
    id: 'Add',
    defaultMessage: 'Add',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  thereWereSomeErrors: {
    id: 'There were some errors',
    defaultMessage: 'There were some errors',
  },
});

interface RichResultEditModalProps {
  typeId: string;
  content: any;
  existingData?: any;
  onSave: (typeId: string, formData: any) => void;
  onClose: () => void;
}

/**
 * Rich Result Edit Modal
 *
 * Modal dialog for editing Rich Result data using schema-driven forms.
 */
const RichResultEditModal: React.FC<RichResultEditModalProps> = ({
  typeId,
  content,
  existingData,
  onSave,
  onClose,
}) => {
  const intl = useIntl();
  const typeConfig = config.settings.richresults?.types[typeId];
  const schema = typeConfig.schema(intl);

  // Get initial form data
  const initialData = existingData
    ? typeConfig.fromJsonLd(existingData)
    : typeConfig.getDefaults(content, config);

  const [formData, setFormData] = useState(initialData);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  if (!typeConfig) {
    return null;
  }

  const handleSubmit = () => {
    // Run standard schema validation
    const validationErrors: Record<string, string[]> = validateFields(
      schema,
      formData,
      intl,
    );

    // Run type-specific validation if provided
    if (typeConfig.validate) {
      const typeSpecificErrors = typeConfig.validate(formData, intl);
      // Merge type-specific errors with standard validation errors
      Object.entries(typeSpecificErrors).forEach(([field, errors]) => {
        if (validationErrors[field]) {
          // Append to existing errors
          validationErrors[field] = [...validationErrors[field], ...errors];
        } else {
          // Add new error
          validationErrors[field] = errors;
        }
      });
    }

    if (Object.keys(validationErrors).length > 0) {
      // Show toast messages for each error field (Volto pattern)
      Object.entries(validationErrors).forEach(([field, fieldErrors]) => {
        const fieldTitle = field.includes('.')
          ? field // Use full path for nested fields
          : schema.properties?.[field]?.title || field;

        toast.error(
          <Toast error title={fieldTitle} content={fieldErrors.join(', ')} />,
        );
      });

      // Separate nested errors (object_list fields) from top-level errors
      const topLevelErrors: Record<string, string[]> = {};
      const nestedErrors: Record<string, string[]> = {};

      Object.entries(validationErrors).forEach(([field, messages]) => {
        if (field.includes('.')) {
          // Nested field error (e.g., "author.0.name")
          nestedErrors[field] = messages;
        } else {
          // Top-level field error
          topLevelErrors[field] = messages;
        }
      });

      // Set nested errors in formErrors state for custom handling
      setFormErrors(nestedErrors);

      // Only pass top-level errors to requestError for Form component
      if (Object.keys(topLevelErrors).length > 0) {
        const errorArray = Object.entries(topLevelErrors).flatMap(
          ([field, messages]) =>
            messages.map((message) => ({ field, message })),
        );

        const errorArrayWithTimestamp = errorArray.map((error) => ({
          ...error,
          timestamp: Date.now(),
        }));

        setRequestError(JSON.stringify(errorArrayWithTimestamp));
      } else {
        setRequestError(null);
      }

      return;
    }

    // Validation passed - clear errors and save
    setRequestError(null);
    setFormErrors({});
    onSave(typeId, formData);
  };

  const modalTitle = existingData
    ? `${intl.formatMessage(messages.edit)} ${typeConfig.title}`
    : `${intl.formatMessage(messages.add)} ${typeConfig.title}`;

  const hasErrors = !!requestError || Object.keys(formErrors).length > 0;

  // Handle keyboard events to allow form inputs to work without modal interference
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();

    // Check if we're in a form input that should handle its own keyboard events
    const isInFormInput =
      tagName === 'textarea' ||
      tagName === 'input' ||
      target.isContentEditable ||
      target.closest('[contenteditable="true"]') ||
      target.closest('[data-slate-editor="true"]');

    if (!isInFormInput) return;

    // Stop propagation for keys that should stay within form inputs
    const formInputKeys = [
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ];

    if (formInputKeys.includes(e.key)) {
      e.stopPropagation();
    }
  };

  const modalId = `rich-result-modal-${typeId}`;

  return (
    <Modal
      open
      className="rich-result-edit-modal"
      onKeyDown={handleKeyDown}
      aria-labelledby={modalId}
      role="dialog"
      aria-modal="true"
    >
      <Modal.Header id={modalId}>{modalTitle}</Modal.Header>
      <Modal.Content scrolling>
        {/* General error message (Volto pattern) */}
        {hasErrors && (
          <Message
            icon="warning"
            negative
            attached
            role="alert"
            aria-live="assertive"
            header={intl.formatMessage(messages.error)}
            content={intl.formatMessage(messages.thereWereSomeErrors)}
          />
        )}

        {/* Display nested field errors that can't be shown inline */}
        <ValidationErrorMessage errors={formErrors} schema={schema} />

        <Form
          schema={schema}
          formData={formData}
          onChangeFormData={setFormData}
          requestError={requestError}
          formErrors={formErrors}
          error={
            hasErrors
              ? { message: intl.formatMessage(messages.thereWereSomeErrors) }
              : null
          }
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>{intl.formatMessage(messages.cancel)}</Button>
        <Button primary onClick={handleSubmit}>
          {intl.formatMessage(messages.save)}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RichResultEditModal;

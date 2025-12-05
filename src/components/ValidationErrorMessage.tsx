import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Message, List } from 'semantic-ui-react';

const messages = defineMessages({
  validationErrors: {
    id: 'Please fix the following errors:',
    defaultMessage: 'Please fix the following errors:',
  },
});

interface ValidationErrorMessageProps {
  errors: Record<string, string[]>;
  schema: any;
  formatErrorPath?: (path: string, schema: any, intl: any) => string | null;
}

/**
 * Helper to format nested error paths into human-readable labels
 * Converts "author.0.name" -> "Authors #1 - Name"
 */
const defaultFormatErrorPath = (
  path: string,
  schema: any,
  intl: any,
): string | null => {
  const parts = path.split('.');

  if (parts.length < 2) return null;

  const [fieldName, index, nestedField] = parts;
  const fieldSchema = schema.properties?.[fieldName];

  if (!fieldSchema) return null;

  const fieldTitle = fieldSchema.title || fieldName;
  const itemNumber = parseInt(index, 10) + 1;

  if (nestedField) {
    const nestedFieldSchema = fieldSchema.schema?.properties?.[nestedField];
    const nestedFieldTitle = nestedFieldSchema?.title || nestedField;
    return `${fieldTitle} #${itemNumber} - ${nestedFieldTitle}`;
  }

  return `${fieldTitle} #${itemNumber}`;
};

/**
 * ValidationErrorMessage Component
 *
 * Displays validation errors in a formatted error message box.
 * Particularly useful for nested field errors that can't be displayed inline.
 *
 * @param errors - Record of field paths to error messages
 * @param schema - Schema definition to extract field titles
 * @param formatErrorPath - Optional custom formatter for error paths
 */
const ValidationErrorMessage: React.FC<ValidationErrorMessageProps> = ({
  errors,
  schema,
  formatErrorPath = defaultFormatErrorPath,
}) => {
  const intl = useIntl();

  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <Message error>
      <Message.Header>
        {intl.formatMessage(messages.validationErrors)}
      </Message.Header>
      <List bulleted>
        {Object.entries(errors).map(([fieldPath, errorMessages]) => {
          const formattedPath = formatErrorPath(fieldPath, schema, intl);
          return errorMessages.map((errorMsg, idx) => (
            <List.Item key={`${fieldPath}-${idx}`}>
              <strong>{formattedPath || fieldPath}:</strong> {errorMsg}
            </List.Item>
          ));
        })}
      </List>
    </Message>
  );
};

export default ValidationErrorMessage;

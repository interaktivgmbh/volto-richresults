import { defineMessages } from 'react-intl';
import {
  urlValidator,
  emailValidator,
  minLengthValidator,
  maxLengthValidator,
} from '@plone/volto/helpers/FormValidation/validators';

const messages = defineMessages({
  required: {
    id: 'This field is required',
    defaultMessage: 'This field is required',
  },
});

/**
 * Validation utilities
 */

/**
 * Check if a value is set (not empty/null/undefined)
 * Returns false for empty strings, whitespace-only strings, null, undefined, or empty values
 */
const isValueSet = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  if (value === '') {
    return false;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return false;
  }
  return true;
};

/**
 * Validate a single value based on its type
 * Returns error message or null if valid
 *
 * Uses Volto's built-in validators for URL and email validation.
 */
const validateValueByType = (
  value: any,
  type: string,
  intl: any,
): string | null => {
  // Skip empty values (already handled by required validation)
  if (!isValueSet(value)) {
    return null;
  }

  switch (type) {
    case 'url':
      if (typeof value === 'string') {
        return urlValidator({
          value,
          field: {},
          formData: {},
          formatMessage: intl.formatMessage,
        });
      }
      break;
    case 'email':
      if (typeof value === 'string') {
        return emailValidator({
          value,
          field: {},
          formData: {},
          formatMessage: intl.formatMessage,
        });
      }
      break;
    // Add more types here as needed
  }

  return null;
};

/**
 * Validate field value
 * Returns array of error messages (empty if valid)
 */
const validateFieldValue = (
  fieldSchema: any,
  fieldValue: any,
  intl: any,
): string[] => {
  const errors: string[] = [];

  // Check if this field should be validated as URL
  if (fieldSchema.widget === 'url' || fieldSchema.type === 'url') {
    const error = validateValueByType(fieldValue, 'url', intl);
    if (error) errors.push(error);
  }

  // Check if this field should be validated as Email
  if (fieldSchema.widget === 'email' || fieldSchema.type === 'email') {
    const error = validateValueByType(fieldValue, 'email', intl);
    if (error) errors.push(error);
  }

  // Check minLength constraint
  if (
    fieldSchema.minLength !== undefined &&
    typeof fieldValue === 'string' &&
    fieldValue.length > 0
  ) {
    const error = minLengthValidator({
      value: fieldValue,
      field: fieldSchema,
      formData: {},
      formatMessage: intl.formatMessage,
    });
    if (error) errors.push(error);
  }

  // Check maxLength constraint
  if (
    fieldSchema.maxLength !== undefined &&
    typeof fieldValue === 'string' &&
    fieldValue.length > 0
  ) {
    const error = maxLengthValidator({
      value: fieldValue,
      field: fieldSchema,
      formData: {},
      formatMessage: intl.formatMessage,
    });
    if (error) errors.push(error);
  }

  return errors;
};

/**
 * Validate Array field with itemsType
 * Returns array of error messages (empty if valid)
 *
 * This validates arrays where each item should be of a specific type (url, email, etc.)
 * defined by the itemsType property in the schema.
 */
const validateArray = (
  fieldSchema: any,
  fieldValue: any,
  intl: any,
): string[] => {
  // Only validate if it's an array widget
  if (fieldSchema.widget !== 'array' || !Array.isArray(fieldValue)) {
    return [];
  }

  // Check if itemsType is defined
  const itemsType = fieldSchema.itemsType;
  if (!itemsType) {
    return []; // No type defined, skip validation
  }

  const errors: string[] = [];

  fieldValue.forEach((item, index) => {
    // Validate each item using the shared validation logic
    const error = validateValueByType(item, itemsType, intl);
    if (error) {
      errors.push(`Item ${index + 1}: ${error}`);
    }
  });

  return errors;
};

export const validateFields = (
  schema: any,
  formData: any,
  intl: any,
): Record<string, string[]> => {
  const newErrors: Record<string, string[]> = {};

  // Validate required fields
  (schema.required || []).forEach((fieldName: string) => {
    const value = formData[fieldName];
    if (!isValueSet(value)) {
      newErrors[fieldName] = [intl.formatMessage(messages.required)];
    }
  });

  // Validate field formats based on widget type
  Object.keys(schema.properties || {}).forEach((fieldName: string) => {
    const fieldSchema = schema.properties[fieldName];
    const value = formData[fieldName];

    // Skip empty values (unless required, which is already checked)
    if (!isValueSet(value)) return;

    // Validate field value (URL, Email, etc.)
    const fieldValueErrors = validateFieldValue(fieldSchema, value, intl);
    if (fieldValueErrors.length > 0) {
      newErrors[fieldName] = fieldValueErrors;
    }

    // Array validation (for arrays with itemsType like sameAs)
    const arrayErrors = validateArray(fieldSchema, value, intl);
    if (arrayErrors.length > 0) {
      newErrors[fieldName] = arrayErrors;
    }

    // Object_list validation (nested schemas like author)
    if (fieldSchema.widget === 'object_list' && Array.isArray(value)) {
      value.forEach((item: any, index: number) => {
        if (!item) return;

        // Check nested required fields
        const nestedSchema = fieldSchema.schema;
        (nestedSchema?.required || []).forEach((nestedField: string) => {
          const nestedValue = item[nestedField];
          if (!isValueSet(nestedValue)) {
            newErrors[`${fieldName}.${index}.${nestedField}`] = [
              intl.formatMessage(messages.required),
            ];
          }
        });

        // Check nested fields
        Object.keys(nestedSchema?.properties || {}).forEach(
          (nestedField: string) => {
            const nestedFieldSchema = nestedSchema.properties[nestedField];
            const nestedValue = item[nestedField];

            if (!isValueSet(nestedValue)) return;

            // Validate nested field value (URL, Email, etc.)
            const fieldValueErrors = validateFieldValue(
              nestedFieldSchema,
              nestedValue,
              intl,
            );
            if (fieldValueErrors.length > 0) {
              newErrors[`${fieldName}.${index}.${nestedField}`] =
                fieldValueErrors;
            }
          },
        );
      });
    }
  });

  return newErrors;
};

/**
 * Convert plain text string to Volto richtext format
 * Wraps text in <p> tags and returns { data: "<html>" }
 * Use this for plain text that needs HTML wrapping.
 */
export const convertStringToSlate = (value: string): object => {
  if (value === null || value === undefined || value === '') {
    return { data: '' };
  }
  return { data: `<p>${value}</p>` };
};

/**
 * Convert HTML string to Volto richtext format
 * Returns { data: "<html>" } without additional wrapping
 * Use this when converting from JSON-LD where HTML is already formatted.
 */
export const convertHtmlToSlate = (value: string): object => {
  if (value === null || value === undefined || value === '') {
    return { data: '' };
  }
  // If it's already an object with data, return as-is
  if (typeof value === 'object' && 'data' in value) {
    return value;
  }
  // Otherwise wrap the HTML string
  return { data: value };
};

/**
 * Convert Volto richtext format to HTML string
 * Extracts HTML from { data: "<html>" } or returns string as-is
 */
export const convertSlateToString = (value: any): string => {
  if (!value) {
    return '';
  }
  // If it's already a string, return it
  if (typeof value === 'string') {
    return value;
  }
  // If it's richtext format, extract the data
  if (typeof value === 'object' && value.data) {
    return value.data;
  }
  return '';
};

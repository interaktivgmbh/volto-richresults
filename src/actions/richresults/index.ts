import { GET_RICHRESULTS_CONFIG } from '../../constants/ActionTypes';

/**
 * Get Rich Results configuration
 * Fetches the selectable types configuration from the backend
 *
 * @returns {Object} Action object
 */
export function getRichResultsConfig() {
  return {
    type: GET_RICHRESULTS_CONFIG,
    request: {
      op: 'get',
      path: '/@richresults-config',
    },
  };
}

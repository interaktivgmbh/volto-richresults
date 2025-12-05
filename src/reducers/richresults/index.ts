/**
 * Rich Results Config reducer
 * @module reducers/richResultsConfig
 */

import { GET_RICHRESULTS_CONFIG } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  data: null,
};

/**
 * Rich Results Config reducer
 * @function richResultsConfig
 * @param {Object} state Current state
 * @param {Object} action Action to be handled
 * @returns {Object} New state
 */
export default function richResultsConfig(
  state = initialState,
  action: any = {},
) {
  switch (action.type) {
    case `${GET_RICHRESULTS_CONFIG}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_RICHRESULTS_CONFIG}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        data: action.result,
      };
    case `${GET_RICHRESULTS_CONFIG}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}

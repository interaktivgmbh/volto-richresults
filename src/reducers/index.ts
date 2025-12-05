/* istanbul ignore file */
import defaultReducers from '@plone/volto/reducers';

import richResultsConfig from './richresults';

const reducers = {
  ...defaultReducers,
  richResultsConfig: richResultsConfig,
};

export default reducers;

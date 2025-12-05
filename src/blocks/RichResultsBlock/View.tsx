import React from 'react';

interface ViewProps {
  data: any;
  properties: any;
}

/**
 * View component for Rich Results Block
 * In view mode, this block is hidden since Rich Results are rendered in the page head
 */
const View: React.FC<ViewProps> = ({ data, properties }) => {
  // Don't render anything in view mode
  // The Rich Results are already rendered in the page head by RichResultsAppExtra
  return null;
};

export default View;

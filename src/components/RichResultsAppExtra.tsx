import React from 'react';
import { useSelector } from 'react-redux';
import RichResultsHead from './RichResultsHead';

/**
 * RichResultsAppExtra Component
 *
 * This component is registered as an appExtra in Volto config and runs on every page.
 * It reads the current content from Redux state and renders Rich Results in the <head>.
 *
 * This is the Volto-recommended way to add components that should appear on all pages.
 */
const RichResultsAppExtra: React.FC = () => {
  const content = useSelector((state: any) => state.content?.data);
  const richResults = content?.richresults;

  return <RichResultsHead richResults={richResults} />;
};

export default RichResultsAppExtra;

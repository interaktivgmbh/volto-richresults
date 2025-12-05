import React from 'react';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';

interface RichResultsHeadProps {
  richResults?: any[];
}

/**
 * RichResultsHead Component
 *
 * Renders Rich Results (JSON-LD structured data) in the HTML <head> section.
 * This is critical for SEO as search engines need the structured data in the page source.
 *
 * Usage:
 * ```tsx
 * <RichResultsHead richResults={content.richresults} />
 * ```
 *
 * @param richResults - Array of JSON-LD objects from content.richresults field
 */
const RichResultsHead: React.FC<RichResultsHeadProps> = ({ richResults }) => {
  if (!richResults || !Array.isArray(richResults) || richResults.length === 0) {
    return null;
  }

  const validResults = richResults.filter(
    (item) =>
      item && typeof item === 'object' && item['@context'] && item['@type'],
  );

  if (validResults.length === 0) {
    return null;
  }

  // Safely serialize JSON-LD - fail silently to prevent breaking the page
  // TODO: Add admin-only error visibility in a future iteration
  let jsonLdString: string;
  try {
    jsonLdString = JSON.stringify(validResults, null, 0);
  } catch {
    return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">{jsonLdString}</script>
    </Helmet>
  );
};

export default RichResultsHead;

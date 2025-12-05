import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import checkSVG from '@plone/volto/icons/check.svg';

const messages = defineMessages({
  testWithGoogle: {
    id: 'Test with Google',
    defaultMessage: 'Test with Google',
  },
  opensInNewWindow: {
    id: 'Opens in new window',
    defaultMessage: 'Opens in new window',
  },
});

interface GoogleRichResultsTestProps {
  richResults: any[];
  fluid?: boolean;
  style?: React.CSSProperties;
}

/**
 * Google Rich Results Test Component
 *
 * Provides a button to validate Rich Results using Google's official Rich Results Test Tool.
 * Opens the test in a new browser tab with the current JSON-LD data.
 *
 * @param richResults - Array of JSON-LD objects to test
 * @param fluid - Whether the button should be full width (default: true)
 * @param style - Additional inline styles
 */
const GoogleRichResultsTest: React.FC<GoogleRichResultsTestProps> = ({
  richResults,
  fluid = true,
  style,
}) => {
  const intl = useIntl();

  const GOOGLE_TEST_URL =
    'https://search.google.com/test/rich-results?utm_medium=jsonld';

  /**
   * Wraps Rich Results in script tag for Google's test tool
   */
  const wrapForTest = (jsonLd: any[]): string => {
    const jsonLdString = JSON.stringify(jsonLd, null, 2);
    return `<script type="application/ld+json">\n${jsonLdString}\n</script>`;
  };

  /**
   * Submits Rich Results to Google's Rich Results Test Tool
   */
  const handleTest = () => {
    if (!richResults || richResults.length === 0) {
      return;
    }

    const wrappedCode = wrapForTest(richResults);

    // Create a hidden form and submit it to Google's test tool
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_TEST_URL;
    form.target = '_blank';

    const textarea = document.createElement('textarea');
    textarea.name = 'code_snippet';
    textarea.value = wrappedCode;
    textarea.style.display = 'none';

    form.appendChild(textarea);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  if (!richResults || richResults.length === 0) {
    return null;
  }

  return (
    <Button
      type="button"
      positive
      fluid={fluid}
      aria-label={`${intl.formatMessage(messages.testWithGoogle)} (${intl.formatMessage(messages.opensInNewWindow)})`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleTest();
      }}
      style={style}
    >
      {intl.formatMessage(messages.testWithGoogle)}
    </Button>
  );
};

export default GoogleRichResultsTest;

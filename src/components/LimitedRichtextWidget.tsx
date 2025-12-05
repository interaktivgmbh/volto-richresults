import React, { useMemo, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import config from '@plone/registry';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import deserialize from '@plone/volto-slate/editor/deserialize';
import { makeEditor } from '@plone/volto-slate/utils/editor';
import {
  createEmptyParagraph,
  normalizeExternalData,
} from '@plone/volto-slate/utils';

/**
 * Limited Richtext Widget
 *
 * A restricted richtext editor with only Google-supported formatting
 * for JobPosting descriptions (and similar structured data fields).
 *
 * Supports: paragraphs, lists, bold, italic, links
 * Outputs: <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>
 *
 * Passes custom slateSettings directly to SlateEditor instead of
 * modifying global config.
 */

interface LimitedRichtextWidgetProps {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
  error?: string[];
  value: any;
  onChange: (id: string, value: any) => void;
  fieldSet?: string;
  className?: string;
  block?: string;
  placeholder?: string;
  properties?: any;
}

const LimitedRichtextWidget: React.FC<LimitedRichtextWidgetProps> = (props) => {
  const {
    id,
    onChange,
    value,
    fieldSet,
    className,
    block,
    placeholder,
    properties,
  } = props;

  const [selected, setSelected] = React.useState(false);
  const editor = useMemo(() => makeEditor(), []);
  const token = useSelector((state: any) => state.userSession?.token);

  // Custom Slate configuration with limited formatting options
  const limitedSlateSettings = useMemo(
    () => ({
      ...config.settings.slate,
      // Limit available buttons (bold, italic, lists, links)
      toolbarButtons: [
        'bold',
        'italic',
        'separator',
        'numbered-list',
        'bulleted-list',
        'link',
      ],
      // Disable advanced features
      expandedToolbarButtons: [],
      enableExpandedToolbar: false,
      // Keep context toolbar buttons but filter to only supported ones
      contextToolbarButtons: [],
    }),
    [],
  );

  // Convert Slate value to HTML (same as HtmlSlateWidget)
  const toHtml = useCallback(
    (slateValue: any) => {
      const mockStore = configureStore();
      const html = ReactDOMServer.renderToStaticMarkup(
        <Provider store={mockStore({ userSession: { token } })}>
          <MemoryRouter>{serializeNodes(slateValue || [])}</MemoryRouter>
        </Provider>,
      );

      return {
        'content-type': slateValue ? slateValue['content-type'] : 'text/html',
        encoding: slateValue ? slateValue.encoding : 'utf8',
        data: html,
      };
    },
    [token],
  );

  // Convert HTML to Slate value (same as HtmlSlateWidget)
  const fromHtml = useCallback(
    (htmlValue: any) => {
      const html = htmlValue?.data || '';
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const body =
        parsed.getElementsByTagName('google-sheets-html-origin').length > 0
          ? parsed.querySelector('google-sheets-html-origin > table')
          : parsed.body;
      let data = deserialize(editor, body, { collapseWhitespace: false });
      data = normalizeExternalData(editor, data);
      return data.length ? data : [createEmptyParagraph()];
    },
    [editor],
  );

  const valueFromHtml = useMemo(() => {
    return fromHtml(value);
  }, [value, fromHtml]);

  const handleChange = useCallback(
    (newValue: any) => {
      onChange(id, toHtml(newValue));
    },
    [onChange, toHtml, id],
  );

  const handleClick = useCallback(() => {
    setSelected(true);
  }, []);

  return (
    <FormFieldWrapper {...props} draggable={false} className="slate_wysiwyg">
      <div
        className="slate_wysiwyg_box"
        role="textbox"
        tabIndex={-1}
        style={{ boxSizing: 'initial' }}
        onClick={handleClick}
        onKeyDown={() => {}}
      >
        <SlateEditor
          className={className}
          id={id}
          name={id}
          value={valueFromHtml}
          fieldSet={fieldSet}
          onChange={handleChange}
          block={block}
          selected={selected}
          properties={properties}
          placeholder={placeholder}
          slateSettings={limitedSlateSettings}
          editableProps={{ 'aria-multiline': 'true' }}
        />
      </div>
    </FormFieldWrapper>
  );
};

export default LimitedRichtextWidget;

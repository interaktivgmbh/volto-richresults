/**
 * ImageUrlWidget component.
 *
 * A widget for selecting images that stores the actual image download URL
 * (with @@images/image) instead of the content URL.
 */

import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import {
  addAppURL,
  isInternalURL,
  flattenToAppURL,
} from '@plone/volto/helpers/Url/Url';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

interface ImageUrlWidgetProps {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
  error?: string[];
  value?: string;
  onChange: (id: string, value: string | undefined) => void;
  onBlur?: (id: string, value: string | undefined) => void;
  onClick?: () => void;
  placeholder?: string;
  isDisabled?: boolean;
  openObjectBrowser: (options: any) => void;
  imageScale?: string; // Image scale to use (default: 'large')
}

/**
 * Transform a content URL to an image download URL
 *
 * @param url - The content URL (e.g., /my-image)
 * @param scale - The image scale to use (default: 'large')
 * @returns The image download URL (e.g., /my-image/@@images/image/large)
 */
const toImageDownloadUrl = (url: string, scale: string = 'large'): string => {
  if (!url) return url;

  // If it already contains @@images, return as-is
  if (url.includes('@@images')) {
    return url;
  }

  // Remove trailing slash if present
  const cleanUrl = url.replace(/\/$/, '');

  // Append @@images/image/{scale}
  return `${cleanUrl}/@@images/image/${scale}`;
};

/**
 * Widget to select images and store their download URL
 *
 * Similar to UrlWidget but:
 * - Opens object browser in 'image' mode
 * - Transforms selected URLs to include @@images/image path
 */
const ImageUrlWidget: React.FC<ImageUrlWidgetProps> = (props) => {
  const {
    id,
    onChange,
    onBlur = () => {},
    onClick = () => {},
    placeholder,
    isDisabled,
    openObjectBrowser,
    imageScale = 'large',
  } = props;

  const inputId = `field-${id}`;
  const [value, setValue] = useState(flattenToAppURL(props.value || ''));

  const clear = () => {
    setValue('');
    onChange(id, undefined);
  };

  const onChangeValue = (_value: string) => {
    let newValue = _value;

    if (newValue?.length > 0) {
      if (isInternalURL(newValue)) {
        newValue = flattenToAppURL(newValue);
      }
    }

    setValue(newValue);

    // Convert to full URL if internal
    const finalValue = isInternalURL(newValue) ? addAppURL(newValue) : newValue;
    onChange(id, finalValue === '' ? undefined : finalValue);
  };

  const handleSelectImage = (url: string) => {
    // Transform the content URL to image download URL
    const imageUrl = toImageDownloadUrl(url, imageScale);
    onChangeValue(imageUrl);
  };

  return (
    <FormFieldWrapper {...props} className="url wide">
      <div className="wrapper">
        <Input
          id={inputId}
          name={id}
          type="text"
          value={value || ''}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={({ target }) => onChangeValue(target.value)}
          onBlur={({ target }) =>
            onBlur(id, target.value === '' ? undefined : target.value)
          }
          onClick={() => onClick()}
        />
        {value?.length > 0 ? (
          <Button.Group>
            <Button
              basic
              className="cancel"
              aria-label="clearImageUrl"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                clear();
              }}
            >
              <Icon name={clearSVG} size="30px" />
            </Button>
          </Button.Group>
        ) : (
          <Button.Group>
            <Button
              basic
              icon
              aria-label="openImageBrowser"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openObjectBrowser({
                  mode: 'image',
                  overlay: true,
                  onSelectItem: (url: string) => {
                    handleSelectImage(url);
                  },
                });
              }}
            >
              <Icon name={navTreeSVG} size="24px" />
            </Button>
          </Button.Group>
        )}
      </div>
    </FormFieldWrapper>
  );
};

export default withObjectBrowser(ImageUrlWidget);

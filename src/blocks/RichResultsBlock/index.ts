import { defineMessages } from 'react-intl';
import icon from '@plone/volto/icons/globe.svg';
import Edit from './Edit';
import View from './View';

defineMessages({
  richResults: {
    id: 'Rich Results',
    defaultMessage: 'Rich Results',
  },
});

const RichResultsBlock = {
  id: 'richResultsBlock',
  title: 'Rich Results',
  icon: icon,
  group: 'common',
  view: View,
  edit: Edit,
  restricted: false,
  mostUsed: false,
  sidebarTab: 1,
};

export default RichResultsBlock;

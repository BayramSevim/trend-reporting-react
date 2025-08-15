// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Element4 } from 'iconsax-react';

// type

// icons
const icons = {
  samplePage: Element4
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const samplePage = {
  id: 'dashboard',
  title: <FormattedMessage id="dashboard" />,
  type: 'group',
  // url: '/sample-page',
  url: '/dashboard',
  icon: icons.samplePage
};

export default samplePage;

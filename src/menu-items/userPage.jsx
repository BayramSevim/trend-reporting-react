// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DocumentCode2, User } from 'iconsax-react';

// type

// icons
const icons = {
  user: User
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const UserPage = {
  id: 'kullanicilar',
  title: <FormattedMessage id="kullanicilar" />,
  type: 'group',
  icon: icons.user,
  url: '/kullanicilar'
  // icon: icons.samplePage
};

export default UserPage;

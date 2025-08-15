// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  I24Support,
  MessageProgramming,
  Book,
  Diagram,
  Element,
  Receive,
  Forward,
  HambergerMenu,
  DirectDown,
  Box,
  Layer,
  KeyboardOpen,
  PresentionChart,
  ExportCurve
} from 'iconsax-react';

// type

// icons
// icons
const icons = {
  maintenance: MessageProgramming,
  contactus: I24Support,
  report: Book,
  product: Diagram,
  element: Element,
  consume: Receive,
  transfer: Forward,
  hamburger: HambergerMenu,
  vakum: DirectDown,
  package: Box,
  silo: Layer,
  equipment: KeyboardOpen,
  trend: PresentionChart,
  rasyon: ExportCurve
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'rasyon-aktarim',
  title: <FormattedMessage id="rasyon-aktarim" />,
  type: 'group',
  icon: icons.rasyon,
  children: [
    {
      id: 'boyyem-rasyon-aktarim',
      title: <FormattedMessage id="boyyem-rasyon-aktarim" />,
      type: 'item',
      url: '/rasyon/boyyem-rasyon-aktarim',
      icon: icons.rasyon,
      target: false
    },
    {
      id: 'senpilic-rasyon-aktarim',
      title: <FormattedMessage id="senpilic-rasyon-aktarim" />,
      url: '/rasyon/senpilic-rasyon-aktarim',
      type: 'item',
      icon: icons.rasyon,
      target: false
    }
  ]
};

export default pages;

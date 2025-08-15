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
  PresentionChart
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
  trend: PresentionChart
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'silo',
  title: <FormattedMessage id="silo" />,
  type: 'group',
  icon: icons.silo,
  url: '/silo/silolar',
  target: false
};

export default pages;

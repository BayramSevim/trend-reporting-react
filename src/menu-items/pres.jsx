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
  CpuCharge,
  Pharagraphspacing,
  Next
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
  transfer: Next,
  hamburger: HambergerMenu,
  vakum: DirectDown,
  package: Box,
  silo: Layer,
  equipment: KeyboardOpen,
  trend: PresentionChart,
  pres: Pharagraphspacing
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'pres',
  title: <FormattedMessage id="pres" />,
  type: 'group',
  icon: icons.pres,
  url: '/pres-raporlari/pres'
  // children: [
  //   {
  //     id: 'pres',
  //     title: <FormattedMessage id="pres" />,
  //     type: 'item',
  //     url: '/pres-raporlari/pres',
  //     icon: icons.pres,
  //     target: false
  //   },
  //   {
  //     id: 'pres-transfer',
  //     title: <FormattedMessage id="pres-transfer" />,
  //     url: '/pres-raporlari/pres-transfer',
  //     type: 'item',
  //     icon: icons.transfer,
  //     target: false
  //   }
  // ]
};

export default pages;

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
  trend: PresentionChart
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'hammadde-transfer-raporu',
  title: <FormattedMessage id="hammadde-transfer" />,
  type: 'group',
  icon: icons.transfer,
  url: '/hammadde-transfer/hammadde-transfer-raporu',
  target: false
};

export default pages;

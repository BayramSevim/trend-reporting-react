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
  id: 'tuketim',
  title: <FormattedMessage id="tuketim" />,
  type: 'group',
  icon: icons.consume,
  children: [
    {
      id: 'buyukbas-tuketim',
      title: <FormattedMessage id="buyukbas-tuketim" />,
      type: 'item',
      url: '/tuketim/buyukbas-tuketim-raporu',
      icon: icons.consume,
      target: false
    },
    {
      id: 'kanatli1-tuketim',
      title: <FormattedMessage id="kanatli1-tuketim" />,
      url: '/tuketim/kanatli1-tuketim-raporu',
      type: 'item',
      icon: icons.consume,
      target: false
    },
    {
      id: 'kanatli2-tuketim',
      title: <FormattedMessage id="kanatli2-tuketim" />,
      url: '/tuketim/kanatli2-tuketim-raporu',
      type: 'item',
      icon: icons.consume,
      target: false
    }
  ]
};

export default pages;

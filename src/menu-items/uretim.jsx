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
  id: 'uretim',
  title: <FormattedMessage id="uretim" />,
  type: 'group',
  icon: icons.product,
  children: [
    {
      id: 'buyukbas',
      title: <FormattedMessage id="buyukbas" />,
      type: 'collapse',
      icon: icons.product,
      children: [
        {
          id: 'buyukbas-uretim',
          title: <FormattedMessage id="buyukbas-uretim" />,
          type: 'item',
          url: '/uretim/buyukbas-uretim-raporu',
          icon: icons.product,
          target: false
        },
        {
          id: 'buyukbas-grup-bazli-uretim',
          title: <FormattedMessage id="buyukbas-grup-bazli-uretim" />,
          type: 'item',
          url: '/uretim/buyukbas-grup-bazli-uretim',
          icon: icons.element,
          target: false
        }
        // {
        //   id: 'buyukbas-vardiya-bazli-uretim',
        //   title: <FormattedMessage id="buyukbas-vardiya-bazli-uretim" />,
        //   type: 'item',
        //   url: '/uretim/buyukbas-vardiya-bazli-uretim',
        //   icon: icons.element,
        //   target: false
        // },
      ]
    },
    {
      id: 'kanatli1',
      title: <FormattedMessage id="kanatli1" />,
      type: 'collapse',
      icon: icons.product,
      children: [
        {
          id: 'kanatli1-uretim',
          title: <FormattedMessage id="kanatli1-uretim" />,
          type: 'item',
          url: '/uretim/kanatli1-uretim-raporu',
          icon: icons.product,
          target: false
        },
        {
          id: 'kanatli1-grup-bazli-uretim',
          title: <FormattedMessage id="kanatli1-grup-bazli-uretim" />,
          type: 'item',
          url: '/uretim/kanatli1-grup-bazli-uretim',
          icon: icons.element,
          target: false
        }
        // {
        //   id: 'kanatli-vardiya-bazli-uretim',
        //   title: <FormattedMessage id="kanatli-vardiya-bazli-uretim" />,
        //   type: 'item',
        //   url: '/uretim/kanatli-vardiya-bazli-uretim',
        //   icon: icons.element,
        //   target: false
        // }
      ]
    },
    {
      id: 'kanatli2',
      title: <FormattedMessage id="kanatli2" />,
      type: 'collapse',
      icon: icons.product,
      children: [
        {
          id: 'kanatli2-uretim',
          title: <FormattedMessage id="kanatli2-uretim" />,
          type: 'item',
          url: '/uretim/kanatli2-uretim-raporu',
          icon: icons.product,
          target: false
        },
        {
          id: 'kanatli2-grup-bazli-uretim',
          title: <FormattedMessage id="kanatli2-grup-bazli-uretim" />,
          type: 'item',
          url: '/uretim/kanatli2-grup-bazli-uretim',
          icon: icons.element,
          target: false
        }
        // {
        //   id: 'kanatli-vardiya-bazli-uretim',
        //   title: <FormattedMessage id="kanatli-vardiya-bazli-uretim" />,
        //   type: 'item',
        //   url: '/uretim/kanatli-vardiya-bazli-uretim',
        //   icon: icons.element,
        //   target: false
        // }
      ]
    }
  ]
};

export default pages;

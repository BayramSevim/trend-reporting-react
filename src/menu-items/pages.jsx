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
  id: 'pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  icon: icons.report,
  children: [
    {
      id: 'uretim',
      title: <FormattedMessage id="uretim" />,
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
        },
        {
          id: 'buyukbas-vardiya-bazli-uretim',
          title: <FormattedMessage id="buyukbas-vardiya-bazli-uretim" />,
          type: 'item',
          url: '/uretim/buyukbas-vardiya-bazli-uretim',
          icon: icons.element,
          target: false
        },
        {
          id: 'kanatli-uretim',
          title: <FormattedMessage id="kanatli-uretim" />,
          type: 'item',
          url: '/uretim/kanatli-uretim-raporu',
          icon: icons.product,
          target: false
        },
        {
          id: 'kanatli-grup-bazli-uretim',
          title: <FormattedMessage id="kanatli-grup-bazli-uretim" />,
          type: 'item',
          url: '/uretim/kanatli-grup-bazli-uretim',
          icon: icons.element,
          target: false
        },
        {
          id: 'kanatli-vardiya-bazli-uretim',
          title: <FormattedMessage id="kanatli-vardiya-bazli-uretim" />,
          type: 'item',
          url: '/uretim/kanatli-vardiya-bazli-uretim',
          icon: icons.element,
          target: false
        }
      ]
    },
    {
      id: 'tuketim',
      title: <FormattedMessage id="tuketim" />,
      type: 'collapse',
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
          id: 'buyukbas-vardiya-bazli-tuketim',
          title: <FormattedMessage id="buyukbas-vardiya-bazli-tuketim" />,
          type: 'item',
          url: '/tuketim/buyukbas-vardiya-bazli-tuketim',
          icon: icons.element,
          target: false
        },
        {
          id: 'kanatli-tuketim',
          title: <FormattedMessage id="kanatli-tuketim" />,
          type: 'item',
          url: '/tuketim/kanatli-tuketim-raporu',
          icon: icons.consume,
          target: false
        },
        {
          id: 'kanatli-vardiya-bazli-tuketim',
          title: <FormattedMessage id="kanatli-vardiya-bazli-tuketim" />,
          type: 'item',
          url: '/tuketim/kanatli-vardiya-bazli-tuketim',
          icon: icons.element,
          target: false
        }
      ]
    },
    {
      id: 'hammadde-transfer-raporu',
      title: <FormattedMessage id="hammadde-transfer" />,
      type: 'collapse',
      icon: icons.transfer,
      children: [
        {
          id: 'hammadde-transfer',
          title: <FormattedMessage id="hammadde-transfer" />,
          type: 'item',
          icon: icons.transfer,
          url: '/hammadde-transfer/hammadde-transfer-raporu',
          target: false
        }
      ]
    },
    {
      id: 'extruder-raporu',
      title: <FormattedMessage id="extruder" />,
      type: 'collapse',
      icon: icons.hamburger,
      children: [
        {
          id: 'extruder-uretim-takip',
          title: <FormattedMessage id="extruder-uretim-takip" />,
          type: 'item',
          url: '/extruder/extruder-uretim-takip',
          icon: icons.hamburger,
          target: false
        },
        {
          id: 'extruder-transfer',
          title: <FormattedMessage id="extruder-transfer" />,
          type: 'item',
          url: '/extruder/extruder-transfer',
          icon: icons.transfer,
          target: false
        }
      ]
    },
    {
      id: 'vakum-raporu',
      title: <FormattedMessage id="vakum" />,
      type: 'collapse',
      icon: icons.vakum,
      children: [
        {
          id: 'vakum',
          title: <FormattedMessage id="vakum" />,
          type: 'item',
          url: '/vakum/vakum-raporu',
          icon: icons.vakum,
          target: false
        },
        {
          id: 'vakum-transfer',
          title: <FormattedMessage id="vakum-transfer" />,
          type: 'item',
          url: '/vakum/vakum-transfer',
          icon: icons.transfer,
          target: false
        }
      ]
    },
    {
      id: 'paketleme-raporu',
      title: <FormattedMessage id="paketleme" />,
      type: 'collapse',
      icon: icons.package,
      children: [
        {
          id: 'paketleme',
          title: <FormattedMessage id="paketleme" />,
          type: 'item',
          url: '/paketleme/paketleme-raporu',
          icon: icons.package,
          target: false
        }
      ]
    },
    {
      id: 'silo-raporu',
      title: <FormattedMessage id="silo" />,
      type: 'collapse',
      icon: icons.silo,
      children: [
        {
          id: 'silo',
          title: <FormattedMessage id="silo" />,
          type: 'item',
          url: '/silo/silolar',
          icon: icons.silo,
          target: false
        }
      ]
    },
    {
      id: 'ekipman-hareketleri-raporu',
      title: <FormattedMessage id="ekipman-hareketleri" />,
      type: 'collapse',
      icon: icons.equipment,
      children: [
        {
          id: 'ekipman-hareketleri',
          title: <FormattedMessage id="ekipman-hareketleri" />,
          type: 'item',
          icon: icons.equipment,
          url: '/ekipman/ekipman-hareketleri',
          target: false
        }
      ]
    }
    // {
    //   id: 'trend-raporu',
    //   title: <FormattedMessage id="trend" />,
    //   type: 'collapse',
    //   icon: icons.trend,
    //   children: [
    //     {
    //       id: 'trend',
    //       title: <FormattedMessage id="trend" />,
    //       type: 'item',
    //       icon: icons.trend,
    //       url: '/trend/trendler',
    //       target: false
    //     }
    //   ]
    // }
  ]
};

export default pages;

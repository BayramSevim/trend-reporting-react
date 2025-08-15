import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));

// Sayfalar burada

const DashboardPage = Loadable(lazy(() => import('pages/Dashboard/DashboardPage')));

// BuyukbasProductReport
const BuyukbasProductReport = Loadable(lazy(() => import('pages/ReportPages/ProductReports/Buyukbas/BuyukbasProduct')));
const BuyukbasGroupProductReport = Loadable(lazy(() => import('pages/ReportPages/ProductReports/Buyukbas/BuyukbasGroupProduct')));
const BuyukbasShiftProductReport = Loadable(lazy(() => import('pages/ReportPages/ProductReports/Buyukbas/BuyukbasShiftProduct')));

// KanatlıProductReport
const KanatliProductReport = Loadable(lazy(() => import('pages/ReportPages/ProductReports/Kanatli/KanatliProduct')));
const KanatliGroupProductReport = Loadable(lazy(() => import('pages/ReportPages/ProductReports/Kanatli/KanatliGroupProduct')));
const KanatliShiftProductReport = Loadable(lazy(() => import('pages/ReportPages/ProductReports/Kanatli/KanatliShiftProduct')));

// Kanatlı2ProductReport
const Kanatli2ProductReport = Loadable(lazy(() => import('pages/ReportPages/ProductReports/Kanatli2/KanatliProduct')));
const Kanatli2GroupProductReport = Loadable(lazy(() => import('pages/ReportPages/ProductReports/Kanatli2/KanatliGroupProduct')));
const Kanatli2ShiftProductReport = Loadable(lazy(() => import('pages/ReportPages/ProductReports/Kanatli2/KanatliShiftProduct')));

// BuyukbasConsumptionReports
const BuyukbasConsumption = Loadable(lazy(() => import('pages/ReportPages/ConsumptionReports/Buyukbas/Consumption')));
const BuyukbasShiftByConsumption = Loadable(lazy(() => import('pages/ReportPages/ConsumptionReports/Buyukbas/ShiftByConsumption')));

// KanatlıConsumptionReports
const KanatliConsumption = Loadable(lazy(() => import('pages/ReportPages/ConsumptionReports/Kanatli/Consumption')));
const KanatliShiftByConsumption = Loadable(lazy(() => import('pages/ReportPages/ConsumptionReports/Kanatli/ShiftByConsumption')));

// Kanatlı2ConsumptionReports
const Kanatli2Consumption = Loadable(lazy(() => import('pages/ReportPages/ConsumptionReports/Kanatli2/Consumption')));
const Kanatli2ShiftByConsumption = Loadable(lazy(() => import('pages/ReportPages/ConsumptionReports/Kanatli2/ShiftByConsumption')));

// RawMatTransferReports
const RawMatTransfer = Loadable(lazy(() => import('pages/ReportPages/RawMatTransfer/RawMatTransfer')));

// PresReports
const PresReport = Loadable(lazy(() => import('pages/ReportPages/Pres/Pres')));
const PresTransferReport = Loadable(lazy(() => import('pages/ReportPages/Pres/PresTransfer')));

// Package
const Package = Loadable(lazy(() => import('pages/ReportPages/PackageReport/PackageReport')));

// Silo
const SiloReport = Loadable(lazy(() => import('pages/ReportPages/SiloReports/SiloReport')));

// Rasyon
const BoyyemRasyon = Loadable(lazy(() => import('pages/ReportPages/Rasyon/BoyyemRasyon')));
const SenpilicRasyon = Loadable(lazy(() => import('pages/ReportPages/Rasyon/SenpilicRasyon')));

// Trend
const Trend = Loadable(lazy(() => import('pages/ReportPages/Trend/TrendPage')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <DashboardPage />
        }
      ]
    },
    {
      path: '/uretim',
      element: <DashboardLayout />,
      children: [
        {
          path: 'buyukbas-uretim-raporu',
          element: <BuyukbasProductReport />
        },
        {
          path: 'buyukbas-grup-bazli-uretim',
          element: <BuyukbasGroupProductReport />
        },
        {
          path: 'buyukbas-vardiya-bazli-uretim',
          element: <BuyukbasShiftProductReport />
        },
        {
          path: 'kanatli1-uretim-raporu',
          element: <KanatliProductReport />
        },
        {
          path: 'kanatli1-grup-bazli-uretim',
          element: <KanatliGroupProductReport />
        },
        {
          path: 'kanatli1-vardiya-bazli-uretim',
          element: <KanatliShiftProductReport />
        },
        {
          path: 'kanatli2-uretim-raporu',
          element: <Kanatli2ProductReport />
        },
        {
          path: 'kanatli2-grup-bazli-uretim',
          element: <Kanatli2GroupProductReport />
        },
        {
          path: 'kanatli2-vardiya-bazli-uretim',
          element: <Kanatli2ShiftProductReport />
        }
      ]
    },
    {
      path: '/tuketim',
      element: <DashboardLayout />,
      children: [
        {
          path: 'buyukbas-tuketim-raporu',
          element: <BuyukbasConsumption />
        },
        {
          path: 'buyukbas-vardiya-bazli-tuketim',
          element: <BuyukbasShiftByConsumption />
        },
        {
          path: 'kanatli1-tuketim-raporu',
          element: <KanatliConsumption />
        },
        {
          path: 'kanatli1-vardiya-bazli-tuketim',
          element: <KanatliShiftByConsumption />
        },
        {
          path: 'kanatli2-tuketim-raporu',
          element: <Kanatli2Consumption />
        },
        {
          path: 'kanatli2-vardiya-bazli-tuketim',
          element: <Kanatli2ShiftByConsumption />
        }
      ]
    },
    {
      path: '/hammadde-transfer',
      element: <DashboardLayout />,
      children: [
        {
          path: 'hammadde-transfer-raporu',
          element: <RawMatTransfer />
        }
      ]
    },
    {
      path: '/pres-raporlari',
      element: <DashboardLayout />,
      children: [
        {
          path: 'pres',
          element: <PresReport />
        },
        {
          path: 'pres-transfer',
          element: <PresTransferReport />
        }
      ]
    },
    {
      path: '/paketleme',
      element: <DashboardLayout />,
      children: [
        {
          path: 'paketleme-raporu',
          element: <Package />
        }
      ]
    },
    {
      path: '/silo',
      element: <DashboardLayout />,
      children: [
        {
          path: 'silolar',
          element: <SiloReport />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'trend',
          element: <Trend />
        }
      ]
    },
    {
      path: '/rasyon',
      element: <DashboardLayout />,
      children: [
        {
          path: 'boyyem-rasyon-aktarim',
          element: <BoyyemRasyon />
        },
        {
          path: 'senpilic-rasyon-aktarim',
          element: <SenpilicRasyon />
        }
      ]
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default MainRoutes;

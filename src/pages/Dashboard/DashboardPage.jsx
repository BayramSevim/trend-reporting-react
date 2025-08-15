// material-ui
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import ProductChart from 'components/charts/ProductChart';
import ActiveProduction from 'components/charts/ActiveProduction';
import ActivePress from 'components/charts/ActivePress';
import ActivePackaging from 'components/charts/ActivePackaging';
import MonthProduction from 'components/charts/MonthProductChart';
import RawMatConsume from 'components/charts/RawMatConsumeChart';
import Package from 'components/charts/PackageChart';
import TotalPress from 'components/charts/TotalPressChart';
import TotalPackage from 'components/charts/TotalPackageChart';
import SiloError from 'components/charts/SiloErrorChart';
import GunlukGrupBazliUretim from 'components/charts/GunlukGrupBazliUretim';
import decodeAndDecompressData from 'api/decompressedData';

// ==============================|| SAMPLE PAGE ||============================== //

export default function DashboardPage() {
  const base64data = localStorage.getItem('loginnedUser');
  const userData = base64data.replace(/"/g, '');
  const decompressUserData = decodeAndDecompressData(userData);

  return (
    <>
      <MainCard>
        {/* <Typography variant="body1"> */}
        <Grid container rowSpacing={4.5} columnSpacing={2.75} style={{ height: 'auto' }}>
          <Grid item xs={12} md={12}>
            <Typography
              textAlign={'center'}
              sx={{
                fontSize: 30,
                fontWeight: '700',
                padding: 2,
                borderRadius: 2,
                border: '3px solid rgba(0, 143, 251, 0.85)'
              }}
            >
              Hoşgeldin , {decompressUserData.UserName.toUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <ActiveProduction />
          </Grid>
          <Grid item xs={12} md={6} mt={2}>
            <ActivePress />
          </Grid>
          <Grid item xs={12} md={6} mt={2}>
            <ActivePackaging />
          </Grid>
          <Grid xs={12} ml={3} md={12} mt={2}>
            <GunlukGrupBazliUretim />
          </Grid>
          <Grid item xs={12} md={6} style={{ height: '70vh' }}>
            <MonthProduction />
          </Grid>
          <Grid item xs={12} md={6} style={{ height: '70vh' }}>
            <ProductChart />
          </Grid>
          <Grid item xs={12} md={6} style={{ height: '70vh' }}>
            <RawMatConsume />
          </Grid>
          <Grid item xs={12} md={6} style={{ height: '70vh' }}>
            <Package />
          </Grid>
          {/* <Grid item xs={12} md={6} style={{ height: '65vh' }}>
            <TotalPress />
          </Grid>
          <Grid item xs={12} md={6} style={{ height: '65vh' }}>
            <TotalPackage />
          </Grid> */}
          <Grid item xs={12} md={12} style={{ height: '75vh' }}>
            <SiloError />
          </Grid>
        </Grid>
        {/* </Typography> */}
      </MainCard>
    </>
  );
}

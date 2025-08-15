import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MasterDetail from '../../components/MasterDetail/Silo/MasterDetail';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { GetAPIUrl } from 'api/gama';
import decompressedData from 'api/decompressedData';
import MainCard from 'components/MainCard';
import { Button } from '@mui/material';

const RawMatTransfer = () => {
  const [silo, setSilo] = useState([]);
  const [responseURL, setResponseURL] = useState('');

  const fetchProduct = async () => {
    await axios.get(`${GetAPIUrl()}/api/Silo/GetSilos`).then((res) => {
      setResponseURL(res.request.responseURL);
      const data = decompressedData(res.data);
      setSilo(data);
    });
  };

  const createExportUrl = () => {
    const encodedJData = encodeURIComponent(responseURL);
    return `${GetAPIUrl()}/ExportApi/ExportPage.aspx?jdata=${encodedJData}&type=13`; // URL'yi oluştur
  };

  const handleExportClick = () => {
    const exportUrl = createExportUrl();
    window.open(exportUrl, '_blank');
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Grid
        container
        style={{ height: 'auto' }}
        display="flex"
        justifyContent="space-between" // İki öğeyi sol ve sağa yayar
        alignItems="center" // Dikeyde ortalar
        mb={2}
      >
        <Grid item height={200} display="flex" alignItems="center">
          <Typography variant="h1" sx={{ fontWeight: '800' }}>
            Silo Raporu
          </Typography>
        </Grid>
        <Grid item display="flex" alignItems="center">
          <Button variant="outlined" color="warning" onClick={handleExportClick}>
            Export
          </Button>
        </Grid>
      </Grid>
      <MainCard>
        <MasterDetail product={silo} />
      </MainCard>
    </>
  );
};

export default RawMatTransfer;

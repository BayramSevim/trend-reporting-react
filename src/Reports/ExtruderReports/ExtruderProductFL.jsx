import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import Header from '../../Templates/Header';
import 'react-datepicker/dist/react-datepicker.css';
// import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import MasterDetail from '../../components/MasterDetail/Extruder/MasterDetail';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import RawMatTransferSelection from '../../components/selection/RawMatTransferSelection';

import { GetAPIUrl } from '../../api/gama';
import MainCard from 'components/MainCard';

const ExtruderProductFL = () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const [product, setProduct] = useState([]);

  //UseStates

  const [selectedDateS, setSelectedDateS] = useState(oneDayAgo);
  const [selectedDateF, setSelectedDateF] = useState(new Date());
  const [isUpdate, setIsUpdate] = useState(false);

  //UseStates
  const handleDateChangeS = (date) => {
    setSelectedDateS(date);
  };
  const handleDateChangeF = (date) => {
    setSelectedDateF(date);
  };

  const fetchProduct = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Vakum/GetExtruderInfo`, {
        params: {
          dateS: selectedDateS,
          dateF: selectedDateF
        }
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setIsUpdate(!isUpdate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Get Data And UseEffects

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
        <Grid item>
          <Typography variant="h1" sx={{ fontWeight: '800' }}>
            Extruder Üretim Takip Raporu
          </Typography>
        </Grid>
        <Grid item>
          <RawMatTransferSelection
            selectedDateS={selectedDateS}
            selectedDateF={selectedDateF}
            handleDateChangeS={handleDateChangeS}
            handleDateChangeF={handleDateChangeF}
            fetchProduct={fetchProduct}
          />
        </Grid>
      </Grid>
      <MainCard>
        <MasterDetail dateS={selectedDateS} dateF={selectedDateF} isUpdate={isUpdate} />
      </MainCard>
    </>
  );
};

export default ExtruderProductFL;

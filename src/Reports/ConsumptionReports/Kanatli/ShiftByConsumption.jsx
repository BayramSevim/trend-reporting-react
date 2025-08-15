import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MasterDetail from 'components/MasterDetail/ShiftConsumption/Kanatli/MasterDetail';
import Grid from '@mui/material/Grid';
import ShiftSelection from 'components/selection/ShiftSelection';
import { GetAPIUrl } from 'api/gama';
import decompressedData from 'api/decompressedData';
import MainCard from 'components/MainCard';
import { Typography } from '@mui/material';
import ShiftConsumptionChart from 'components/charts/Kanatli/ShiftConsumption/ShiftConsumptionChart';

const ShiftByConsumption = () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  //UseStates
  const [product, setProduct] = useState([]);
  const [getProduct, setGetProduct] = useState([]);
  const [productId, setProductId] = useState(0);
  const [shift, setShift] = useState(0);
  const [selectedDateS, setSelectedDateS] = useState(new Date());
  const [isUpdate, setIsUpdate] = useState(false);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-11 arası olduğu için 1 ekliyoruz.
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formattedDateS = formatDate(new Date(selectedDateS));

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDateF = `${year}-${month}-${day}`;

  const handleDateChangeS = (date) => {
    setSelectedDateS(date);
  };

  const fetchProduct = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Product/GetRawMatConsumeByDateAndShiftAndUnitSelect`, {
        params: {
          dateS: formattedDateS,
          dateF: formattedDateF,
          rawMatId: productId > 0 ? productId : 0,
          shift: shift,
          unitSelection: 2
        }
      })
      .then((res) => {
        if (res.data !== null) {
          const data = decompressedData(res.data);
          setProduct(data);
          setIsUpdate(!isUpdate);
        } else {
          setProduct([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductId = async () => {
    await axios.get(`${GetAPIUrl()}/api/Product/GetRawMaterialFilters`).then((res) => {
      const data = decompressedData(res.data);
      setGetProduct(data);
    });
  };

  const checkProduct = (e) => {
    setProductId(e);
  };

  const checkShift = (e) => {
    setShift(e);
  };

  useEffect(() => {
    fetchProduct();
    getProductId();
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
            Kanatlı-1 Vardiya Bazlı Tüketim Raporu
          </Typography>
        </Grid>
        <Grid item>
          <ShiftSelection
            selectedDateS={selectedDateS}
            handleDateChangeS={handleDateChangeS}
            getProduct={getProduct}
            fetchProduct={fetchProduct}
            checkProduct={checkProduct}
            product={product}
            checkShift={checkShift}
          />
        </Grid>
      </Grid>

      <MainCard>
        {product.length > 1 ? (
          <Grid container>
            <Grid item md={8.5}>
              <MasterDetail product={product} isUpdate={isUpdate} />
            </Grid>
            <Grid item md={3.5} mt={5}>
              <ShiftConsumptionChart productList={product} isUpdate={isUpdate} />
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item>
              <MasterDetail product={product} isUpdate={isUpdate} />
            </Grid>
          </Grid>
        )}
      </MainCard>
    </>
  );
};

export default ShiftByConsumption;

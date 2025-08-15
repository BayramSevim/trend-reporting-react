import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MasterDetail from 'components/MasterDetail/ShiftProduct/Kanatli2/MasterDetail';
import Grid from '@mui/material/Grid';
import ShiftSelection from 'components/selection/ShiftSelection';
import { GetAPIUrl } from 'api/gama';
import decompressedData from 'api/decompressedData';
import MainCard from 'components/MainCard';
import { Typography } from '@mui/material';
import ProductCumShiftChart from 'components/charts/Kanatli2/ProductCumShiftChart';

const KanatliShiftProduct = () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  //UseStates
  const [product, setProduct] = useState([]);
  const [getProduct, setGetProduct] = useState([]);
  const [productId, setProductId] = useState(0);
  const [selectedDateS, setSelectedDateS] = useState(oneDayAgo);
  const [shift, setGetShift] = useState(0);
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

  const handleDateChangeS = (date) => {
    setSelectedDateS(date);
  };

  const fetchProduct = async () => {
    await axios
      .get(`${GetAPIUrl()}/api/Product/GetProductCumByDateAndShiftAndUnitSelection`, {
        params: {
          dateS: formattedDateS,
          dateF: new Date(),
          productId: productId > 0 ? productId : 0,
          shift: shift,
          unitSelection: 3
        }
      })
      .then((res) => {
        const data = decompressedData(res.data);
        setProduct(data);
        setIsUpdate(!isUpdate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductId = async () => {
    const response = await axios.get(`${GetAPIUrl()}/api/Product/GetProductsFilters`);
    const data = decompressedData(response.data);
    setGetProduct(data);
  };

  const checkProduct = (e) => {
    setProductId(e);
  };

  const checkShift = (e) => {
    setGetShift(e);
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
            Kanatlı-2 Vardiya Bazlı Üretim Raporu
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
          <Grid container rowSpacing={5} columnSpacing={2.75}>
            <Grid item xs={12} md={8.5}>
              <MasterDetail product={product} isUpdate={isUpdate} />
            </Grid>
            <Grid item xs={5} md={3.5} mt={5}>
              <ProductCumShiftChart
                productList={product}
                productId={productId}
                selectedDateS={selectedDateS}
                selectedDateF={new Date()}
                shift={shift}
                isUpdate={isUpdate}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container rowSpacing={5}>
            <Grid item xs={12}>
              <MasterDetail dateS={selectedDateS} dateF={new Date()} productId={productId} shift={shift} isUpdate={isUpdate} />
            </Grid>
          </Grid>
        )}
      </MainCard>
    </>
  );
};

export default KanatliShiftProduct;

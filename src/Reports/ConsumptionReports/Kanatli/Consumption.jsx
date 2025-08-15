import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MasterDetail from 'components/MasterDetail/Consumption/Kanatli/MasterDetail';
import Grid from '@mui/material/Grid';
import RawMatSelection from 'components/selection/RawMatSelection';
import { GetAPIUrl } from 'api/gama';
import decompressedData from 'api/decompressedData';
import MainCard from 'components/MainCard';
import { Typography } from '@mui/material';
import ConsumeChart from 'components/charts/Kanatli/Consumption/ConsumptionChart';

import Loader from 'components/Loader';

const Consumption = () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  //UseStates
  const [product, setProduct] = useState([]);
  const [getProduct, setGetProduct] = useState([]);
  const [productId, setProductId] = useState(0);
  const [selectedDateS, setSelectedDateS] = useState(oneDayAgo);
  const [selectedDateF, setSelectedDateF] = useState(new Date());
  const [isUpdate, setIsUpdate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [responseURL, setResponseURL] = useState('');

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-11 arası olduğu için 1 ekliyoruz.
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formattedDateS = formatDate(new Date(selectedDateS));
  const formattedDateF = formatDate(new Date(selectedDateF));

  const handleDateChangeS = (date) => {
    setSelectedDateS(date);
  };
  const handleDateChangeF = (date) => {
    setSelectedDateF(date);
  };

  const fetchProduct = async () => {
    setLoading(true);
    await axios
      .get(`${GetAPIUrl()}/api/Product/GetRawMatConsumeByDate`, {
        params: {
          dateS: formattedDateS,
          dateF: formattedDateF,
          rawMatId: productId > 0 ? productId : 0,
          unitSelection: 2
        }
      })
      .then((res) => {
        if (res.data !== null) {
          const data = decompressedData(res.data);
          setProduct(data);
          setIsUpdate(!isUpdate);
          setResponseURL(res.request.responseURL);
          setLoading(false);
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

  useEffect(() => {
    fetchProduct();
    getProductId();
  }, []);

  return (
    <>
      {loading && <Loader />}
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
            Kanatlı-1 Tüketim Raporu
          </Typography>
        </Grid>
        <Grid item>
          <RawMatSelection
            selectedDateS={selectedDateS}
            selectedDateF={selectedDateF}
            handleDateChangeS={handleDateChangeS}
            handleDateChangeF={handleDateChangeF}
            getProduct={getProduct}
            fetchProduct={fetchProduct}
            checkProduct={checkProduct}
            product={product}
            responseURL={responseURL}
            type={8}
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
              <ConsumeChart productList={product} isUpdate={isUpdate} />
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

export default Consumption;

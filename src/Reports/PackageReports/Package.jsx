import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import Header from '../../Templates/Header';
import 'react-datepicker/dist/react-datepicker.css';
// import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import MasterDetail from '../../components/MasterDetail/PackageR/MasterDetail';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import PackageSelection from '../../components/selection/PackageSelection';

import { GetAPIUrl } from '../../api/gama';
import MainCard from 'components/MainCard';

import Loader from 'components/Loader';

const Package = () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const [product, setProduct] = useState([]);

  //UseStates

  const [selectedDateS, setSelectedDateS] = useState(oneDayAgo);
  const [selectedDateF, setSelectedDateF] = useState(new Date());
  const [isUpdate, setIsUpdate] = useState(false);

  const [loading, setLoading] = useState(false);
  const [responseURL, setResponseURL] = useState('');

  //UseStates
  const handleDateChangeS = (date) => {
    setSelectedDateS(date);
  };
  const handleDateChangeF = (date) => {
    setSelectedDateF(date);
  };

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

  const fetchProduct = async () => {
    setLoading(true);
    await axios
      .get(`${GetAPIUrl()}/api/Package/GetPackage`, {
        params: {
          dateS: formattedDateS,
          dateF: formattedDateF
        }
      })
      .then((res) => {
        setProduct(res.data);
        setIsUpdate(!isUpdate);
        setResponseURL(res.request.responseURL);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProduct();
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
            Paketleme Raporu
          </Typography>
        </Grid>
        <Grid item>
          <PackageSelection
            selectedDateS={selectedDateS}
            selectedDateF={selectedDateF}
            handleDateChangeS={handleDateChangeS}
            handleDateChangeF={handleDateChangeF}
            fetchProduct={fetchProduct}
            product={product}
            responseURL={responseURL}
            type={12}
          />
        </Grid>
      </Grid>
      <MainCard>
        <MasterDetail dateS={selectedDateS} dateF={selectedDateF} isUpdate={isUpdate} />
      </MainCard>
    </>
  );
};

export default Package;

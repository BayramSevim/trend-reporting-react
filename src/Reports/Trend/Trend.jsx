import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Trend from 'components/Trend/Trend'; // LiveChart
import TrendSelection from 'components/selection/Trend';
import { GetTrendUrl } from 'api/gama';
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const tenMinutesAgo = new Date();
  tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

  const [product, setProduct] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [selectEquipment, setSelectEquipment] = useState([]);

  const [selectedDateS, setSelectedDateS] = useState(tenMinutesAgo);
  const [selectedDateF, setSelectedDateF] = useState(new Date());

  const [loading, setLoading] = useState(false);

  const handleDateChangeS = (date) => setSelectedDateS(date);
  const handleDateChangeF = (date) => setSelectedDateF(date);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const fetchProduct = async () => {
    if (selectEquipment.length === 0) {
      toast.warn('Lütfen en az bir ekipman seçiniz.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
      return;
    }

    setLoading(true);
    const allResults = [];

    const formattedDateS = formatDate(new Date(selectedDateS));
    const formattedDateF = formatDate(new Date(selectedDateF));

    try {
      for (const item of selectEquipment) {
        const res = await axios.get(`${GetTrendUrl()}/api/Trend/GetByDate`, {
          params: {
            dateS: formattedDateS,
            dateF: formattedDateF,
            tagName: item.tagName
          }
        });

        const enrichedData = res.data.map((d) => ({
          ...d,
          tagName: item.tagName
        }));

        allResults.push(...enrichedData);
      }

      setProduct(allResults);
    } catch (err) {
      console.error(err);
      toast.error('Veri alınırken hata oluştu.', {
        position: 'top-center',
        autoClose: 4000,
        theme: 'dark'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEquipment = async () => {
    try {
      const res = await axios.get(`${GetTrendUrl()}/api/Trend/GetTrendTags`);
      setEquipment(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const checkEquipment = (selectedItems) => {
    setSelectEquipment(selectedItems || []);
  };

  useEffect(() => {
    if (selectEquipment.length > 0) {
      fetchProduct();
    } else {
      // Seçim boşsa grafiği temizle
      setProduct([]);
    }
  }, [selectEquipment]);

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <Typography variant="h1" sx={{ fontWeight: '800' }}>
            Trend Raporu
          </Typography>
        </Grid>
        <Grid item>
          <TrendSelection
            selectedDateS={selectedDateS}
            selectedDateF={selectedDateF}
            handleDateChangeS={handleDateChangeS}
            handleDateChangeF={handleDateChangeF}
            fetchProduct={fetchProduct}
            getProduct={equipment}
            checkProduct={checkEquipment}
          />
        </Grid>
      </Grid>

      <MainCard>
        <Trend trendData={product} selectEquipment={selectEquipment} />
      </MainCard>
    </>
  );
};

export default Product;

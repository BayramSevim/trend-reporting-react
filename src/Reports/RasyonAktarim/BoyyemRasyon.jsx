import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
// import Header from '../../Templates/Header';
import 'react-datepicker/dist/react-datepicker.css';
// import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import MasterDetail from 'components/MasterDetail/Rasyon/BoyyemRasyon/MasterDetail';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GetAPIUrl } from 'api/gama';
import MainCard from 'components/MainCard';
import { Button } from '@mui/material';
import { Export, Send } from 'iconsax-react';

const Rasyon = () => {
  const fileInputRef = useRef(null);
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const [product, setProduct] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [details, setDetails] = useState([]);
  const [rasyon, setRasyon] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      // const content = e.target.result;
      fetchProduct(file);
    };
    reader.readAsText(file);
  };

  const fetchProduct = async (file) => {
    const formData = new FormData();
    formData.append('File', file);

    try {
      const res = await axios.post(`${GetAPIUrl()}/api/Ration/SendRationBoyyem`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const allRasyonData = res.data; // Tüm gelen veriler (formüller listesi)

      // Her formül için details ve formula bilgilerini al
      const allDetails = allRasyonData.flatMap((item) => item.details || []);
      const allFormulas = allRasyonData.map((item) => item.formula);

      setDetails(allDetails);
      setProduct(allFormulas);
      setRasyon(allRasyonData); // Tüm formülleri doğrudan state'e at
      setIsUpdate((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  const insertRation = async () => {
    // Eğer selectedRow yoksa işlemi durdur
    if (!selectedRow || (Array.isArray(selectedRow) && selectedRow.length === 0)) {
      toast.warning('Lütfen önce bir satır seçiniz');
      return;
    }

    // Seçilen satırları dizi haline getir
    const rowsToInsert = Array.isArray(selectedRow) ? selectedRow : [selectedRow];

    const payload = rowsToInsert.map((item) => {
      const formula = item.formula ?? {
        id: item.id,
        productId: item.productId,
        formulaCode: item.formulaCode,
        formulaName: item.formulaName,
        createDate: item.createDate,
        amount: item.amount
      };

      const details = item.details ?? item.detail ?? [];

      return {
        formula,
        details: details.map((d) => ({
          formulaId: d.formulaId,
          stockNo: d.stockNo,
          stockName: d.stockName,
          amount: d.amount
        }))
      };
    });

    try {
      const res = await axios.post(`${GetAPIUrl()}/api/Ration/InsertRationBoyyem`, payload);
      if (res.data) {
        toast.success('Rasyon Başarıyla Veritabanına Kaydedildi');
      } else {
        toast.error('Rasyon Kaydedilemedi');
      }
    } catch (err) {
      console.error(err);
      toast.error('Bir hata oluştu');
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <Grid container style={{ height: 'auto' }} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item height={200} display="flex" alignItems="center">
          <Typography variant="h1" sx={{ fontWeight: '800' }}>
            Boyyem Rasyon Aktarım
          </Typography>
        </Grid>

        <Grid item display="flex" gap={2} alignItems="center" ml="auto">
          <Button
            variant="contained"
            color="warning"
            startIcon={<Send size={32} />}
            onClick={() => insertRation()}
            sx={{ width: 200, fontWeight: 'bold', visibility: product.length == 0 ? 'hidden' : 'visible' }}
          >
            Veritabanına Aktar
          </Button>
          <input type="file" accept=".txt" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <Button
            variant="contained"
            startIcon={<Export size={32} />}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            sx={{ width: 200, backgroundColor: '#074799', fontWeight: 'bold' }}
          >
            Rasyon Yükle
          </Button>
        </Grid>
      </Grid>

      <MainCard>
        <MasterDetail product={product} details={details} isUpdate={isUpdate} onRowSelect={(row) => setSelectedRow(row)} />
      </MainCard>
    </>
  );
};

export default Rasyon;

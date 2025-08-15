import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { GetAPIUrl } from 'api/gama';

const Selection = ({ selectedDateS, selectedDateF, handleDateChangeS, handleDateChangeF, product, fetchProduct, responseURL, type }) => {
  const createExportUrl = () => {
    const encodedJData = encodeURIComponent(responseURL); // Gelen veriyi encode et
    return `${GetAPIUrl()}/ExportApi/ExportPage.aspx?jdata=${encodedJData}&type=${type}`; // URL'yi oluştur
  };

  const handleExportClick = () => {
    const exportUrl = createExportUrl();
    window.open(exportUrl, '_blank');
  };
  return (
    <>
      <Grid container>
        <MainCard>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label="Başlangıç Tarihi"
                select={selectedDateS}
                defaultValue={dayjs(selectedDateS)}
                onChange={handleDateChangeS}
                format="DD.MM.YYYY HH:mm"
              />
              <DateTimePicker
                label="Bitiş Tarihi"
                defaultValue={dayjs(selectedDateF)}
                select={selectedDateF}
                format="DD.MM.YYYY HH:mm"
                onChange={handleDateChangeF}
              />
              <Button variant="outlined" onClick={fetchProduct} style={{ marginTop: '4%', width: '100%' }}>
                Göster
              </Button>
              {product.length > 0 && (
                <Button variant="outlined" onClick={handleExportClick} color="success" style={{ marginTop: '4%', width: '100%' }}>
                  Export
                </Button>
              )}
            </DemoContainer>
          </LocalizationProvider>
        </MainCard>
      </Grid>
    </>
  );
};

export default Selection;

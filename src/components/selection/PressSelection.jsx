import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { GetAPIUrl } from 'api/gama';

const options = [
  { label: 'Tümü', value: 0 },
  { label: 'Pres-1', value: 1 },
  { label: 'Pres-2', value: 2 },
  { label: 'Pres-3', value: 3 },
  { label: 'Pres-4', value: 4 }
];

const PressSelection = ({
  selectedPres,
  setSelectedPres,
  selectedDateS,
  selectedDateF,
  handleDateChangeS,
  handleDateChangeF,
  fetchProduct,
  product,
  responseURL,
  type
}) => {
  const createExportUrl = () => {
    const encodedJData = encodeURIComponent(responseURL); // Gelen veriyi encode et
    return `${GetAPIUrl()}/ExportApi/ExportPage.aspx?jdata=${encodedJData}&type=${type}`; // URL'yi oluştur
  };

  const handleExportClick = () => {
    const exportUrl = createExportUrl();
    window.open(exportUrl, '_blank');
  };
  return (
    <Box>
      <Grid container>
        <MainCard>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                label="Başlangıç Tarihi"
                defaultValue={dayjs(selectedDateS)}
                onChange={handleDateChangeS}
                format="DD.MM.YYYY HH:mm"
              />
              <DateTimePicker
                label="Bitiş Tarihi"
                defaultValue={dayjs(selectedDateF)}
                onChange={handleDateChangeF}
                format="DD.MM.YYYY HH:mm"
              />
              <Autocomplete
                options={options}
                value={selectedPres}
                onChange={(event, newValue) => setSelectedPres(newValue)}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => <TextField {...params} label="Pres Seçimi" />}
              />
              <Button variant="contained" color="warning" onClick={fetchProduct} style={{ marginTop: '4%', width: '100%' }}>
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
    </Box>
  );
};

export default PressSelection;

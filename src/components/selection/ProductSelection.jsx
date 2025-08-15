import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { Autocomplete, TextField } from '@mui/material';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { GetAPIUrl } from 'api/gama';

const Selection = ({
  selectedDateS,
  selectedDateF,
  handleDateChangeS,
  handleDateChangeF,
  getProduct,
  fetchProduct,
  checkProduct,
  product,
  responseURL,
  type
}) => {
  const createExportUrl = () => {
    const encodedJData = encodeURIComponent(responseURL);
    return `${GetAPIUrl()}/ExportApi/ExportPage.aspx?jdata=${encodedJData}&type=${type}`;
  };

  const handleExportClick = () => {
    const exportUrl = createExportUrl();
    window.open(exportUrl, '_blank');
  };
  return (
    <>
      <Grid container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker', 'DateTimePicker', 'DateTimePicker']}>
            <MainCard>
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
              <Box sx={{ minWidth: 150 }} marginTop={2}>
                <FormControl fullWidth className="form-control">
                  <Autocomplete
                    id="combo-box-demo"
                    options={getProduct}
                    getOptionLabel={(option) => `${option.Code} | ${option.Name}`}
                    isOptionEqualToValue={(option, value) => option.Id === value.id}
                    onChange={(e, newValue) => {
                      checkProduct(newValue.Id);
                    }}
                    renderInput={(params) => <TextField {...params} label="Mamül Seçimi" variant="outlined" />}
                  />

                  <Button color="warning" onClick={fetchProduct} variant="contained" style={{ marginTop: '2%' }}>
                    Göster
                  </Button>
                  {product.length > 0 && (
                    <Button variant="outlined" onClick={handleExportClick} color="success" style={{ marginTop: '2%' }}>
                      Export
                    </Button>
                  )}
                </FormControl>
              </Box>
            </MainCard>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
    </>
  );
};

export default Selection;

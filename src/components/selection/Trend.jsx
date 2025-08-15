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

const Selection = ({ selectedDateS, selectedDateF, handleDateChangeS, handleDateChangeF, fetchProduct, getProduct, checkProduct }) => {
  return (
    <Box>
      <Grid container item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <MainCard>
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
              <Box sx={{ minWidth: 150 }} marginTop={2}>
                <FormControl fullWidth>
                  <Autocomplete
                    multiple
                    options={getProduct}
                    getOptionLabel={(option) => `${option.displayName}`}
                    onChange={(e, newValues) => checkProduct(newValues)}
                    renderInput={(params) => <TextField {...params} placeholder="Ekipman Seçimi" variant="outlined" />}
                  />
                  <Button variant="contained" color="warning" onClick={fetchProduct} style={{ marginTop: '2%' }}>
                    Göster
                  </Button>
                </FormControl>
              </Box>
            </MainCard>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
    </Box>
  );
};

export default Selection;

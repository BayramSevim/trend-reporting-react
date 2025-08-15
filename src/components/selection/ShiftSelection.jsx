import React from 'react';
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

const ShiftSelection = ({ selectedDateS, handleDateChangeS, getProduct, fetchProduct, checkProduct, product, checkShift }) => {
  const shiftArray = [
    {
      id: 0,
      shiftName: 'Tüm Vardiyalar'
    },
    {
      id: 1,
      shiftName: 'Vardiya-1 (00:00 - 08:00)'
    },
    {
      id: 2,
      shiftName: 'Vardiya-2 (08:00 - 16:00)'
    },
    {
      id: 3,
      shiftName: 'Vardiya-3 (16:00 - 00:00)'
    }
  ];
  return (
    <>
      <Grid container>
        <MainCard>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                <FormControl fullWidth className="form-control">
                  <DateTimePicker
                    select={selectedDateS}
                    defaultValue={dayjs(selectedDateS)}
                    onChange={handleDateChangeS}
                    format="DD.MM.YYYY HH:mm"
                    sx={{ mb: 1 }}
                  />
                </FormControl>
              </DemoContainer>
            </LocalizationProvider>
            <Grid sx={{ width: '100%' }}>
              <FormControl fullWidth className="form-control">
                <Autocomplete
                  id="combo-box-demo"
                  options={getProduct}
                  getOptionLabel={(option) => `${option.Code} | ${option.Name}`}
                  isOptionEqualToValue={(option, value) => option.Id === value.id}
                  onChange={(e, newValue) => {
                    checkProduct(newValue.Id);
                  }}
                  renderInput={(params) => <TextField {...params} label="Hammadde Seçimi" variant="outlined" />}
                />
              </FormControl>
              <FormControl fullWidth className="form-control" style={{ marginTop: '10px' }}>
                <Autocomplete
                  id="combo-box-demo"
                  options={shiftArray}
                  getOptionLabel={(option) => `${option.shiftName}`}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, newValue) => {
                    checkShift(newValue.id);
                  }}
                  renderInput={(params) => <TextField {...params} label="Vardiya Seçimi" variant="outlined" />}
                />

                <Button variant="contained" onClick={fetchProduct} style={{ marginTop: '2%' }}>
                  Göster
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </>
  );
};

export default ShiftSelection;

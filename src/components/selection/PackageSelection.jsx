import React from 'react';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';

const PackageSelection = ({ selectedDateS, selectedDateF, handleDateChangeS, handleDateChangeF, fetchProduct }) => {
  return (
    <>
      <Box>
        <Grid container>
          <MainCard>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker', 'DateTimePicker', 'DateTimePicker']}>
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
                <Button variant="contained" color="warning" onClick={fetchProduct} style={{ marginTop: '4%', width: '100%' }}>
                  Göster
                </Button>
              </DemoContainer>
            </LocalizationProvider>
          </MainCard>
        </Grid>
      </Box>
    </>
  );
};

export default PackageSelection;

import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';

const Selection = ({ selectedDateS, handleDateChangeS, fetchProduct }) => {
  return (
    <>
      <Grid container>
        <MainCard>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                select={selectedDateS}
                defaultValue={dayjs(selectedDateS)}
                onChange={handleDateChangeS}
                format="DD.MM.YYYY HH:mm"
              />
              <Button variant="outlined" onClick={fetchProduct} style={{ marginTop: '4%', width: '100%' }}>
                Göster
              </Button>
            </DemoContainer>
          </LocalizationProvider>
        </MainCard>
      </Grid>
    </>
  );
};

export default Selection;

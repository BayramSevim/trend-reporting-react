import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Chart.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { GetAPIUrl } from 'api/gama';
import decompressedData from 'api/decompressedData';
import MainCard from 'components/MainCard';

const ActiveProduction = () => {
  const [activeProduction, setActiveProduction] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      await axios
        .get(`${GetAPIUrl()}/api/Dashboard/GetDashboardCumulative?day=3`)
        .then((response) => {
          const data = decompressedData(response.data);
          setActiveProduction(data.ActiveProductions);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <MainCard>
      <Box sx={{ p: 1, pb: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <Typography variant="h5">Anlık Üretim Bilgileri</Typography>
        </Stack>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 0.1, maxHeight: 650 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: '#222e38' }}>
            <TableRow>
              <TableCell align="center">Batch No</TableCell>
              <TableCell align="center">Formül Adı</TableCell>
              <TableCell align="center">Formül Kodu</TableCell>
              <TableCell align="center">Silo Adı</TableCell>
              <TableCell align="center">Başladı Mı</TableCell>
              <TableCell align="center">Miktar(kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#222e38' }}>
            {activeProduction.map((row, index) => (
              <TableRow
                style={{ color: 'white' }}
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  border: row.IsStarted ? '2px solid lime' : '2px solid #FCDC2A',
                  height: '50px'
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.BatchNo}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.FormulaName}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.FormulaCode}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.SiloName}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.IsStarted ? 'Başladı' : 'Başlamadı'}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.Amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default ActiveProduction;

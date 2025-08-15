import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Chart.css';
import { GetAPIUrl } from '../../api/gama';
import decompressedData from '../../api/decompressedData';

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
import MainCard from 'components/MainCard';

const ActiveProduction = () => {
  const [activePackaging, setActivePackaging] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${GetAPIUrl()}/api/Dashboard/GetDashboardCumulative?day=3`);
      const data = decompressedData(response.data);
      setActivePackaging(data.ActivePackagings);
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
          <Typography variant="h5">Anlık Paketleme Bilgileri</Typography>
        </Stack>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 0.1, maxHeight: 550 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: '#222e38' }}>
            <TableRow>
              <TableCell align="center">Paketleme Adı</TableCell>
              <TableCell align="center">Ürün Adı</TableCell>
              <TableCell align="center">Ürün Kodu</TableCell>
              <TableCell align="center">Hedeflenen Adet</TableCell>
              <TableCell align="center">Başlangıç Tarihi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#222e38' }}>
            {activePackaging.map((row, index) => {
              const date = new Date(row.CreatedDate);
              const formattedDate = date.toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              });
              const formattedTime = date.toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <TableRow style={{ color: 'white' }} key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="center">
                    {row.PackageName}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.Name}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {row.Code}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {row.TargetCount}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {`${formattedDate} ${formattedTime}`}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default ActiveProduction;

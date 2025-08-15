import React, { useState, useEffect, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import './Chart.css';
import { GetAPIUrl } from '../../api/gama';
import decompressedData from '../../api/decompressedData';

// COMPONENTS
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MainCard from 'components/MainCard';

const Chart = () => {
  const [monthProduct, setMonthProduct] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${GetAPIUrl()}/api/Dashboard/GetDashboardCumulative?day=3`);
      const data = decompressedData(response.data);

      setMonthProduct(data.MonthlyProduction);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const dataMonthProduct = monthProduct.map((item) => item.ActAmount);

  const getOptionsByMonthProductBar = (items) => ({
    chart: {
      height: 400,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      foreColor: 'black',
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: items.map((item) => new Date(item.ProductionDate).toLocaleDateString()),
      labels: {
        style: {
          colors: '#FFFFFF'
        }
      },
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#FFFFFF',
            colorTo: '#FFFFFF',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '14px',
        color: 'black' // Tooltip metin rengi
      },
      y: {
        formatter: undefined,
        title: {
          formatter: () => 'Üretilen Miktar(ton): '
        }
      },
      theme: 'dark', // Tooltip arka plan rengini etkileyen tema
      fillSeriesColor: false, // Serinin rengini kullanmak istemediğinde
      background: {
        backgroundColor: '#f0f0f0' // Arka plan rengini buradan ayarla
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: true
      },
      labels: {
        show: true,
        color: 'black',
        formatter: function (val) {
          return val + '%';
        }
      },
      tickAmount: 5
    },
    title: {
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#FFFFF'
      }
    }
  });

  const optionsByMonthProductBar = getOptionsByMonthProductBar(monthProduct);

  return (
    <div>
      <MainCard>
        <Box sx={{ p: 1, pb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="h4">Aylık Üretim Bilgileri</Typography>
          </Stack>
        </Box>
        <ReactApexChart options={optionsByMonthProductBar} series={[{ data: dataMonthProduct }]} type="bar" height={500} />
      </MainCard>
    </div>
  );
};

export default Chart;

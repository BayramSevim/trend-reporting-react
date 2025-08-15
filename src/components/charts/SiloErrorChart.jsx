import React, { useState, useEffect, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { GetAPIUrl } from '../../api/gama';
import decompressedData from '../../api/decompressedData';

import './Chart.css';
import Selection from '../selection/Selection';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MainCard from 'components/MainCard';

const Chart = () => {
  const [monthProduct, setMonthProduct] = useState([]);
  const [dayCheck, setDayCheck] = useState(3);

  const handleDayCheck = (day) => {
    setDayCheck(day);
  };

  const fetchDashboard = useCallback(async () => {
    try {
      await axios
        .get(`${GetAPIUrl()}/api/Dashboard/GetDashboardCumulative?day=${dayCheck}`)
        .then((res) => {
          const data = decompressedData(res.data);
          setMonthProduct(data.SiloErros);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [dayCheck]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const dataMonthProduct = monthProduct.map((item) => item.DiffPercent);

  const getOptionsByMonthProductBar = (items) => ({
    chart: {
      height: 350,
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
      foreColor: 'white',
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
      categories: items.map((item) => item.SiloName),
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
        fontSize: '14px'
      },
      y: {
        formatter: undefined,
        title: {
          formatter: () => 'Hata Oranı: '
        }
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + '%';
        }
      }
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
            <Typography variant="h4">Silo Hata Bilgileri</Typography>
          </Stack>
          <div className="silo-error-select">
            <Selection clas sendDataToParent={handleDayCheck} />
          </div>
        </Box>
        <ReactApexChart options={optionsByMonthProductBar} series={[{ data: dataMonthProduct }]} type="bar" height={540} />
      </MainCard>
    </div>
  );
};

export default Chart;

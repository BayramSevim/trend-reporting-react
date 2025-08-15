import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import '../../Chart.css';
// third-party
import ReactApexChart from 'react-apexcharts';

const GroupByProductChart = ({ productList, isUpdate }) => {
  const [product, setProduct] = useState([]);
  const [optionsByProductPie, setOptionsByProductPie] = useState({});
  const [dataProduct, setDataProduct] = useState([]);
  const fetchGroupProduct = () => {
    setProduct(productList);
  };
  useEffect(() => {
    fetchGroupProduct();
  }, [isUpdate, productList]);

  useEffect(() => {
    const data = product.map((item) => item.SumTarget);
    const options = getOptionsByProductPie(product);
    setDataProduct(data);
    setOptionsByProductPie(options);
  }, [product]);

  const getOptionsByProductPie = (items) => ({
    chart: {
      foreColor: '#ffffff',
      type: 'pie',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    colors: [
      '#2C4E80',
      '#0A6847',
      '#FFC55A',
      '#FC4100',
      '#3C5B6F',
      '#153448',
      '#41B06E',
      '#074173',
      '#DC6B19',
      '#704264',
      '#453F78',
      '#E72929',
      '#008DDA',
      '#430A5D',
      '#00224D',
      '#E8751A'
    ],
    markers: {
      colors: ['#FFFFFF']
    },
    labels: items.map((item) => item.Name),
    legend: {
      show: false
    },
    responsive: [
      {
        breakpoint: 880,
        options: {
          chart: {
            width: 800
          }
        }
      }
    ]
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ReactApexChart key={JSON.stringify(dataProduct)} options={optionsByProductPie} series={dataProduct} type="pie" height={450} />
      </Grid>
    </Grid>
  );
};

export default GroupByProductChart;

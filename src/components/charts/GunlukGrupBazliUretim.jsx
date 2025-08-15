import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import decompressedData from 'api/decompressedData';
import { Box, Stack, Typography } from '@mui/material';
import './TreeChart.css';
import { GetAPIUrl } from 'api/gama';
import { Tree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import MainCard from 'components/MainCard';

const Product = () => {
  const [treeData, setTreeData] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [expandedNodes, setExpandedNodes] = useState({});

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0);
  const formattedDateS = formatDate(startOfDay);
  const formattedDateF = formatDate(new Date());

  useEffect(() => {
    const initialData = {
      id: 1,
      name: 'Boyyem',
      children: [
        { id: 'bb', name: 'Buyukbas', children: [] },
        { id: 'k1', name: 'Kanatli-1', children: [] },
        { id: 'k2', name: 'Kanatli-2', children: [] }
      ]
    };
    setTreeData(initialData);
  }, []);

  const handleClick = async (nodeDatum) => {
    const nodeName = nodeDatum;

    const unitSelectionMap = {
      Buyukbas: 1,
      'Kanatli-1': 2,
      'Kanatli-2': 3
    };

    if (unitSelectionMap[nodeName]) {
      const unitKey = nodeName;

      if (expandedNodes[unitKey]) {
        // Kapat
        const updatedTree = {
          ...treeData,
          children: treeData.children.map((child) => (child.name === nodeName ? { ...child, children: [] } : child))
        };
        setTreeData(updatedTree);
        setExpandedNodes((prev) => ({ ...prev, [unitKey]: false }));
      } else {
        // Aç ve veri çek
        try {
          const res = await axios.get(`${GetAPIUrl()}/api/Product/GetProductByGroupAndUnitSelection`, {
            params: {
              dateS: formattedDateS,
              dateF: formattedDateF,
              productId: 0,
              unitSelection: unitSelectionMap[nodeName]
            }
          });

          const data = decompressedData(res.data);
          const childrenData = data.map((dt) => ({
            name: `${dt.Code} | ${dt.Name} - ${dt.SumActual} kg`,
            id: dt.BatchId,
            children: []
          }));

          const updatedTree = {
            ...treeData,
            children: treeData.children.map((child) => (child.name === nodeName ? { ...child, children: childrenData } : child))
          };

          const depth = calculateTreeDepth(updatedTree);
          const totalNodes = countTotalNodes(updatedTree);
          const width = Math.max(800, totalNodes * 100);
          const height = Math.max(600, depth * 200);

          setTreeData(updatedTree);
          setExpandedNodes((prev) => ({ ...prev, [unitKey]: true }));
          setDimensions({ width, height });
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const calculateTreeDepth = (node) => {
    if (!node.children || node.children.length === 0) return 1;
    return 1 + Math.max(...node.children.map(calculateTreeDepth));
  };

  const countTotalNodes = (node) => {
    if (!node.children || node.children.length === 0) return 1;
    return 1 + node.children.reduce((acc, child) => acc + countTotalNodes(child), 0);
  };

  const renderTree = (node) => {
    if (!node) return {};
    return {
      id: node.id,
      name: node.name,
      children: node.children ? node.children.map(renderTree) : []
    };
  };

  return (
    <MainCard>
      <Box sx={{ p: 1, pb: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <Typography variant="h5">Günlük Grup Bazlı Üretim Raporu</Typography>
        </Stack>
      </Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Tree
          animated
          data={renderTree(treeData)}
          height={dimensions.height + 150}
          width={1600}
          svgProps={{ className: 'custom' }}
          gProps={{
            onClick: (event, nodeDatum) => {
              handleClick(nodeDatum);
            }
          }}
          nodeProps={{
            r: 8,
            fill: 'blue',
            stroke: 'white',
            strokeWidth: 2,
            opacity: 0.8,
            cursor: 'pointer'
          }}
          linkProps={{
            stroke: 'white',
            strokeWidth: 1.5
          }}
          textProps={{
            fill: 'white',
            fontSize: 12,
            fontFamily: 'Arial',
            x: -35,
            y: -40
          }}
        />
      </div>
    </MainCard>
  );
};

export default Product;

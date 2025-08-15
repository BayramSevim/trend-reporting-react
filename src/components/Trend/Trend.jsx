import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import './app.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const LiveChart = ({ trendData }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const lineSeriesRefs = useRef({});
  const seriesNamesRef = useRef([]);
  const [hoverData, setHoverData] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 🎨 Dinamik renk üretici
  const getColor = (index) => {
    const colors = ['#FFD65A', '#4A90E2', '#E74C3C', '#2ECC71', '#F39C12', '#9B59B6', '#16A085', '#C0392B'];
    return colors[index % colors.length];
  };

  // 📈 Grafik Oluşturma
  useEffect(() => {
    const container = chartContainerRef.current;
    const chart = createChart(container, {
      width: container.offsetWidth,
      height: container.offsetHeight,
      layout: {
        background: { type: 'solid', color: '#1E1E1E' },
        textColor: '#FFFFFF'
      },
      grid: {
        vertLines: {
          color: 'rgba(255, 255, 255, 0.1)', // Dikey çizgi rengi (örnek açık beyaz, opaklık 0.1)
          style: 1 // 0: solid, 1: dotted, 2: dashed
        },
        horzLines: {
          color: 'rgba(255, 255, 255, 0.1)', // Yatay çizgi rengi
          style: 1
        }
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true
      }
    });

    chartRef.current = chart;

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        chart.applyOptions({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      });
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  // 📊 Veri Güncelleme
  useEffect(() => {
    if (!trendData || !Array.isArray(trendData)) return;
    if (!chartRef.current) return;

    const chart = chartRef.current;

    // Önceki serileri temizle
    Object.values(lineSeriesRefs.current).forEach((series) => {
      chart.removeSeries(series);
    });

    lineSeriesRefs.current = {};
    seriesNamesRef.current = [];

    const groupedData = {};

    trendData.forEach((item) => {
      const tag = item.tagName || 'UNKNOWN';
      if (!groupedData[tag]) {
        groupedData[tag] = [];
      }

      const timestamp = Math.floor(new Date(item.date).getTime() / 1000);
      groupedData[tag].push({
        time: timestamp,
        value: parseFloat(item.value.toString().replace(',', '.'))
      });
    });

    const tagNames = Object.keys(groupedData);
    seriesNamesRef.current = tagNames;

    tagNames.forEach((tag, index) => {
      const color = getColor(index);
      const series = chart.addLineSeries({ color, lineWidth: 3 });
      const sortedData = groupedData[tag].sort((a, b) => a.time - b.time);
      series.setData(sortedData);
      lineSeriesRefs.current[tag] = series;
    });

    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time) {
        setHoverData(null);
        return;
      }

      const hoveredValues = tagNames
        .map((tag, index) => {
          const series = lineSeriesRefs.current[tag];
          const data = param.seriesData.get(series);
          if (data) {
            return {
              name: tag.split('!')[1].split('.')[0],
              value: data.value,
              time: new Date((param.time + new Date().getTimezoneOffset() * 60) * 1000).toLocaleTimeString(),
              color: getColor(index)
            };
          }
          return null;
        })
        .filter(Boolean);

      setHoverData(hoveredValues);
    });
  }, [trendData]);

  // 🔍 Zoom fonksiyonları
  const handleZoom = (direction) => {
    const timeScale = chartRef.current?.timeScale();
    if (!timeScale) return;

    const visibleRange = timeScale.getVisibleRange();
    if (!visibleRange) return;

    const { from, to } = visibleRange;
    const range = to - from;
    const center = from + range / 2;

    const zoomFactor = direction === 'in' ? 0.5 : 2;
    const newFrom = center - (range * zoomFactor) / 2;
    const newTo = center + (range * zoomFactor) / 2;

    timeScale.setVisibleRange({ from: newFrom, to: newTo });
  };

  const handleResetZoom = () => {
    chartRef.current?.timeScale().fitContent();
  };

  useEffect(() => {
    const exitHandler = (e) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', exitHandler);
    return () => window.removeEventListener('keydown', exitHandler);
  }, []);

  return (
    <>
      {/* Zoom Butonları */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          position: isFullscreen ? 'fixed' : 'relative',
          top: isFullscreen ? '20px' : 'auto',
          zIndex: isFullscreen && 10000,
          right: isFullscreen ? '20px' : 'auto',
          justifyContent: 'flex-end'
        }}
      >
        <button onClick={() => handleZoom('in')} style={buttonStyle}>
          Yaklaştır +
        </button>
        <button onClick={() => handleZoom('out')} style={buttonStyle}>
          Uzaklaştır -
        </button>
        <button onClick={handleResetZoom} style={buttonStyle}>
          Reset
        </button>
        <button onClick={() => setIsFullscreen((prev) => !prev)} style={buttonStyle}>
          {/* {isFullscreen ? 'Tam Ekranı Kapat' : 'Tam Ekran'} */}
          <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} style={{ transition: 'transform 0.3s ease' }} />
        </button>
      </div>

      <div style={{ position: 'relative' }}>
        {hoverData && (
          <div
            style={{
              ...tooltipStyle,
              position: isFullscreen ? 'fixed' : 'absolute',
              top: isFullscreen ? '20px' : '10px',
              left: isFullscreen ? '20px' : '10px',
              zIndex: 100000
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Birim</th>
                  <th style={thStyle}>Değer</th>
                  <th style={thStyle}>Saat</th>
                </tr>
              </thead>
              <tbody>
                {hoverData.map((data, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#333' : '#444' }}>
                    <td style={{ color: data.color, ...tdStyle }}>{data.name}</td>
                    <td style={{ color: data.color, ...tdStyle }}>{data.value}</td>
                    <td style={tdStyle}>{data.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
        <div ref={chartContainerRef} className={`chart-container ${isFullscreen ? 'fullscreen-chart' : ''}`} />
        <div style={{ color: 'white', marginTop: '5px', fontSize: '14px' }}>Count: {trendData?.length || 0}</div>
      </div>
    </>
  );
};

// 🎨 Style Ayarları
const buttonStyle = {
  padding: '6px 12px',
  backgroundColor: '#0277c5ff',
  color: '#FFFFFF',
  border: '1px solid #555',
  fontWeight: 'bold',
  fontSize: '15px',
  borderRadius: '5px',
  cursor: 'pointer'
};

const tooltipStyle = {
  width: '300px',
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.94)',
  color: '#fff',
  padding: '15px',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
  fontSize: '16px',
  zIndex: 10,
  border: '2px solid #fff',
  fontWeight: 400
};

const thStyle = {
  textAlign: 'center',
  padding: '8px',
  borderBottom: '2px solid #fff'
};

const tdStyle = {
  padding: '10px',
  textAlign: 'center'
};

export default LiveChart;

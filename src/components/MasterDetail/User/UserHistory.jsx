import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, Summary, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { GetAPIUrl } from 'api/gama';
import axios from 'axios';
import decodeAndDecompressData from 'api/decompressedData';

const BatchHistory = ({ userId }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUserDetail = async () => {
        await axios.get(`${GetAPIUrl()}/api/Authentication/GetReportUserAuthByUserId?userId=${userId.Id}`).then((res) => {
          const data = decodeAndDecompressData(res.data);
          setOrderHistoryStore(data);
        });
      };
      fetchUserDetail();
    }
  }, [userId]);

  return (
    <DataGrid dataSource={orderHistoryStore} showBorders={true}>
      <Paging defaultPageSize={10} />
      <Column dataField="AuthName" caption="Yetki Adı" alignment="center" />
      <Column dataField="Auth" caption="Yetki" alignment="center" />
    </DataGrid>
  );
};

export default BatchHistory;

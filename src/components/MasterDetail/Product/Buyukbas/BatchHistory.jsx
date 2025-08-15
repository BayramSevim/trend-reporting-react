import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, Summary, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { GetAPIUrl } from 'api/gama';
import decompressedData from 'api/decompressedData';
import axios from 'axios';

const BatchHistory = ({ productId }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(`${GetAPIUrl()}/api/Product/GetBatchDetail?batchId=${productId.Id}`);
    const data = decompressedData(response.data);
    setOrderHistoryStore(data);
  };

  useEffect(() => {
    if (productId.Id) {
      fetchData();
    }
  }, [productId.Id]);

  return (
    <DataGrid dataSource={orderHistoryStore} showBorders={true}>
      <Paging defaultPageSize={15} />
      <Column dataField="SiraNo" caption="Sıra No" alignment="center" />
      <Column dataField="Id" caption="Parti Id" alignment="center" />
      <Column dataField="RawMatCode" caption="Hammadde Kod" alignment="center" />
      <Column dataField="RawMatName" caption="Hammadde Ad" alignment="center" />
      <Column dataField="CreatedDate" dataType="date" caption="Başlangıç Tarihi" alignment="center" />
      <Column dataField="TargetAmount" caption="Teorik M." alignment="center" />
      <Column dataField="ActualAmount" caption="Pratik M." alignment="center" />
      <Column dataField="SpentTime" caption="Süre (sn)" alignment="center" />
      <Column dataField="SiloName" caption="Silo Ad" alignment="center" />

      <Summary>
        <TotalItem column="Amount" summaryType="sum">
          <ValueFormat precision={2} />
        </TotalItem>
      </Summary>
    </DataGrid>
  );
};

export default BatchHistory;

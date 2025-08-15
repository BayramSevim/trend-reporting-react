import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Column, DataGrid, Paging, Summary, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { GetAPIUrl } from 'api/gama';
import decompressedData from 'api/decompressedData';

const OrderHistory = ({ productId }) => {
  const [suppliersData, setSuppliersData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${GetAPIUrl()}/api/Product/GetFormulaDetail?batchId=${productId.Id}`);
      const data = decompressedData(response.data);
      setSuppliersData(data);
    } catch (error) {
      console.error('Order History : ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId.Id]);

  return (
    <DataGrid dataSource={suppliersData} showBorders={true}>
      <Paging defaultPageSize={15} />
      <Column dataField="SiraNo" caption="Sıra No" alignment="center" />
      <Column dataField="UnitName" caption="Birim Ad" alignment="center" />
      <Column dataField="SiloName" caption="Silo Ad" alignment="center" />
      <Column dataField="RawMatCode" caption="Hammadde Kod" alignment="center" />
      <Column dataField="RawMatName" caption="Hammadde Adı" alignment="center" />
      <Column dataField="Queue" caption="Sıra" alignment="center" />
      <Column dataField="Amount" caption="Miktar" alignment="center" />
      <Summary>
        <TotalItem column="Amount" summaryType="sum">
          <ValueFormat precision={2} />
        </TotalItem>
      </Summary>
    </DataGrid>
  );
};

export default OrderHistory;

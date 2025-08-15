import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, Summary, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { GetAPIUrl } from 'api/gama';

const BatchHistory = ({ vakumId }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  useEffect(() => {
    if (vakumId) {
      const url = `${GetAPIUrl()}/api/Vakum/GetVakumDetailById?vakumMainId=${vakumId}`;

      const suppliersData = createStore({
        key: 'Id',
        loadUrl: url
      });
      setOrderHistoryStore(suppliersData);
    }
  }, [vakumId]);

  return (
    <DataGrid dataSource={orderHistoryStore} showBorders={true}>
      <Paging defaultPageSize={20} />
      <Column dataField="CreatedDate" dataType="date" caption="Oluşturulma Tarihi" alignment="center" format="dd.MM.yyyy HH.mm" />
      <Column dataField="SiraNo" caption="Parti Adet" alignment="center" />
      <Column dataField="PeletKg" caption="Pelet Kilo" alignment="center" />
      <Column dataField="YagKg" caption="Yağ Kilo" alignment="center" />
      <Column dataField="PeletZmn" caption="Pelet Dozaj Süresi" alignment="center" />
      <Column dataField="YagZmn" caption="Yağ Dozaj Süresi" alignment="center" />

      <Summary>
        <TotalItem column="PeletKg" summaryType="sum">
          <ValueFormat precision={2} />
        </TotalItem>
        <TotalItem column="YagKg" summaryType="sum">
          <ValueFormat precision={3} />
        </TotalItem>
      </Summary>
    </DataGrid>
  );
};

export default BatchHistory;

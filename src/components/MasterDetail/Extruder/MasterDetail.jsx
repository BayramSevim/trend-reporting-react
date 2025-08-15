import React, { useEffect, useState } from 'react';
import { Column, DataGrid, MasterDetail, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';

import { GetAPIUrl } from '../../../api/gama';

const App = ({ dateS, dateF, isUpdate }) => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-11 arası olduğu için 1 ekliyoruz.
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formattedDateS = formatDate(new Date(dateS));
  const formattedDateF = formatDate(new Date(dateF));

  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  useEffect(() => {
    const url = `${GetAPIUrl()}/api/Vakum/GetExtruderInfo?dateS=${formattedDateS}&dateF=${formattedDateF}`;

    const suppliersData = createStore({
      key: 'Id',
      loadUrl: url
    });
    setOrderHistoryStore(suppliersData);
  }, [isUpdate]);

  return (
    <DataGrid
      dataSource={orderHistoryStore}
      remoteOperations={false}
      showBorders={true}
      allowColumnReordering={true}
      columnHidingEnabled={true}
      id="gridContainer"
    >
      <Pager allowedPageSizes={[10, 20, 50]} showPageSizeSelector={true} showNavigationButtons={true} />
      <GroupPanel visible={true} emptyPanelText="İstediğiniz alana göre gruplamak için sütun başlığını buraya sürükleyiniz." />
      <SearchPanel visible={true} width={310} />
      <Paging defaultPageSize={10} />

      <Column dataField="RationCode" caption="Rasyon Kodu" alignment="center" width={180} />
      <Column dataField="FormulaName" caption="Yem Adı" alignment="center" />
      <Column dataField="CreatedDate" dataType="date" caption="Saat" alignment="center" format="HH.mm" width={70} />
      <Column dataField="BeslemeHiz" caption="Besleme H." alignment="center" width={90} />
      <Column dataField="KondSic" caption="Kondisyoner S." alignment="center" width={120} />
      <Column dataField="KondBhr" caption="Kond.Buhar" alignment="center" width={100} />
      <Column dataField="ExtYag" caption="Ext.Yağ" alignment="center" width={100} />
      <Column dataField="ExtAkim" caption="Ana Motor Y." alignment="center" width={110} />
      <Column caption="Extruder Isı Değeri" alignment="center">
        <Column dataField="ExtBolge1Sic" caption="1.Bölge" alignment="center" width={100} />
        <Column dataField="ExtBolge2Sic" caption="2.Bölge" alignment="center" width={100} />
        <Column dataField="ExtBolge3Sic" caption="3.Bölge" alignment="center" width={100} />
      </Column>
      <Column dataField="BicakHiz" caption="Yüzde Fark" alignment="center" width={100} />
      <Column caption="Kurucutu %" alignment="center">
        <Column dataField="KurutucuBolge1Sic" caption="1.Bölge" alignment="center" width={100} />
        <Column dataField="KurutucuBolge2Sic" caption="2.Bölge" alignment="center" width={100} />
        <Column dataField="KurutucuBolge3Sic" caption="3.Bölge" alignment="center" width={100} />
        <Column dataField="KurutucuBolge4Sic" caption="4.Bölge" alignment="center" width={100} />
      </Column>
      <Summary>
        <TotalItem showInColumn="FormulaName" summaryType="count" />
      </Summary>
    </DataGrid>
  );
};

export default App;

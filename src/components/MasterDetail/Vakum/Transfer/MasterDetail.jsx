import React, { useEffect, useState } from 'react';
import { Column, DataGrid, TotalItem, Summary, Paging, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { GetAPIUrl } from '../../../../api/gama';

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
    const url = `${GetAPIUrl()}/api/Vakum/GetVakumActHistory?dateS=${formattedDateS}&dateF=${formattedDateF}`;

    const suppliersData = createStore({
      key: 'RawMatCode',
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

      <Column dataField="UnitName" caption="Formül Kod" alignment="center" width={150} />
      <Column dataField="RawMatCode" caption="Formül Ad" alignment="left" />
      <Column dataField="RawMatName" caption="Ürün Kod" alignment="center" width={150} />
      <Column dataField="StartDate" dataType="date" caption="Başlangıç T." alignment="center" format="dd.MM.yyyy HH.mm" width={150} />
      <Column dataField="FinishDate" dataType="date" caption="Bitiş T." alignment="center" format="dd.MM.yyyy HH.mm" width={150} />
      <Column dataField="SourceSilo" caption="Kaynak Silo" alignment="center" width={150} />
      <Column dataField="TargetSilo" caption="Hedef Silo" alignment="center" width={150} />

      <Summary>
        <TotalItem showInColumn="RawMatCode" column="RawMatCode" summaryType="count" />
      </Summary>
    </DataGrid>
  );
};

export default App;

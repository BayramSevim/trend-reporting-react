import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';

const App = ({ product, isUpdate }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  const fetchData = () => {
    setOrderHistoryStore(product);
  };

  useEffect(() => {
    fetchData();
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

      <Column dataField="UnitName" caption="Birim Ad" alignment="center" width={150} />
      <Column dataField="RawMatCode" caption="Hammadde Kod" alignment="center" width={150} />
      <Column dataField="RawMatName" caption="Hammadde Ad" alignment="left" />
      <Column dataField="StartDate" dataType="date" caption="Başlangıç T." alignment="center" format="dd.MM.yyyy HH.mm" width={150} />
      <Column dataField="FinishDate" dataType="date" caption="Bitiş T." alignment="center" format="dd.MM.yyyy HH.mm" width={150} />
      <Column dataField="SourceSilo" caption="Kaynak Silo" alignment="center" width={150} />
      <Column dataField="TargetSilo" caption="Hedef Silo" alignment="center" width={150} />
      <Summary>
        <TotalItem showInColumn="RawMatCode" summaryType="count" />
      </Summary>
    </DataGrid>
  );
};

export default App;

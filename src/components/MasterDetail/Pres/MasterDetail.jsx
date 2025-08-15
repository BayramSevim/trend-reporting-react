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

      <Column dataField="PresNo" caption="Pres No" alignment="center" width={150} />
      <Column dataField="FormulaNo" caption="Formül No" alignment="center" width={150} />
      <Column dataField="FormulaName" caption="Formül Ad" alignment="left" />
      <Column dataField="StartedDate" dataType="date" caption="Başlangıç T." alignment="center" format="dd.MM.yyyy HH.mm" width={150} />
      <Column dataField="EndedDate" dataType="date" caption="Bitiş T." alignment="center" format="dd.MM.yyyy HH.mm" width={150} />
      <Column dataField="SumQuantity" caption="Toplam Miktar" alignment="center" width={150} />
      <Column dataField="Rate" caption="Oran" alignment="center" width={150} />
      <Column dataField="Rate1" caption="Oran 1" alignment="center" width={150} />
      <Column dataField="Rate2" caption="Oran 2" alignment="center" width={150} />
      <Column dataField="IsStarted" caption="Başladı" alignment="center" width={150} />
      <Column dataField="IsEnded" caption="Bitti" alignment="center" width={150} />
      <Summary>
        <TotalItem showInColumn="RawMatCode" summaryType="count" />
      </Summary>
    </DataGrid>
  );
};

export default App;

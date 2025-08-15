import React, { useEffect, useState } from 'react';
import { Column, DataGrid, MasterDetail, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';
import MasterDetailView from './MasterDetailView';

const App = ({ product, isUpdate }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  const fetchData = async () => {
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
      <MasterDetail enabled={true} component={MasterDetailView} />
      <Paging defaultPageSize={10} />

      <Column dataField="ProductCode" caption="Mamül Kod" alignment="center" width={100} />
      <Column dataField="ProductName" caption="Mamül Ad" alignment="left" />
      <Column dataField="FormulaCode" caption="Formül Kod" alignment="center" width={90} />
      <Column dataField="FormulaName" caption="Formül Ad" alignment="left" />
      <Column dataField="StartedDate" dataType="date" caption="Başlangıç T." alignment="center" format="dd.MM.yyyy HH.mm" width={130} />
      <Column dataField="EndedDate" dataType="date" caption="Bitiş T." alignment="center" format="dd.MM.yyyy HH.mm" width={130} />
      <Column dataField="Id" caption="Lot" alignment="center" width={80} />
      <Column dataField="BatchNo" caption="B.No" alignment="center" width={80} />
      <Column dataField="TargetCount" caption="B.Hedef" alignment="center" width={80} />
      <Column dataField="TargetAmount" caption="Teorik M." alignment="center" width={120} />
      <Column dataField="ActualAmount" caption="Pratik M." alignment="center" width={120} />
      <Column dataField="IsStarted" caption="Başladı" alignment="center" width={80} />
      <Column dataField="IsEnded" caption="Bitti" alignment="center" width={80} />
      <Column dataField="ProductSiloName" caption="Silo Ad" alignment="center" width={80} />
      <Summary>
        <TotalItem showInColumn="ProductCode" column="targetCount" summaryType="count" />
        <TotalItem
          column="TargetAmount"
          summaryType="sum"
          customizeText={(e) => {
            const value = e.value;
            return value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }}
        />

        <TotalItem
          column="ActualAmount"
          summaryType="sum"
          customizeText={(e) => {
            const value = e.value;
            return value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }}
        />
      </Summary>
    </DataGrid>
  );
};

export default App;

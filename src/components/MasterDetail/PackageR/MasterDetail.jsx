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

      <Column dataField="PkName" caption="Ad" alignment="center" width={150} />
      <Column dataField="ProductCode" caption="Ürün Kod" alignment="center" width={250} />
      <Column dataField="ProductName" caption="Ürün Adı" alignment="left" />
      <Column dataField="CreatedDate" dataType="date" caption="Başlangıç T." alignment="center" format="dd.MM.yyyy HH.mm" width={150} />
      <Column dataField="EndedDate" dataType="date" caption="Bitiş T." alignment="center" format="dd.MM.yyyy HH.mm" width={150} />
      <Column dataField="CarPlate" caption="Plaka" alignment="center" width={120} />
      <Column dataField="PackageWeight" caption="Ağırlık" alignment="center" width={120} />
      <Column dataField="TargetCount" caption="Teorik M." alignment="center" width={150} />
      <Column dataField="CompletedCount" caption="Pratik M." alignment="center" width={150} />
      <Summary>
        <TotalItem showInColumn="ProductCode" column="TargetCount" summaryType="count" />
        <TotalItem column="TargetAmount" summaryType="sum" valueFormat="fixedpoint" />
        <TotalItem column="ActualAmount" summaryType="sum" valueFormat="fixedpoint" />
      </Summary>
    </DataGrid>
  );
};

export default App;

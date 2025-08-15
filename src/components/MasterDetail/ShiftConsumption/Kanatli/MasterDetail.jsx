import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';

const App = ({ product, isUpdate }) => {
  const fetchData = () => {
    setOrderHistoryStore(product);
  };

  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

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

      <Column dataField="Code" caption="Hammadde Kod" alignment="center" width={150} />
      <Column dataField="Name" caption="Hammadde Ad" alignment="left" />
      <Column dataField="SumTarget" caption="Teorik M." alignment="center" width={150} />
      <Column dataField="SumActual" caption="Pratik M." alignment="center" width={150} />
      <Column dataField="Diff" caption="Fark" alignment="center" width={150} />
      <Column dataField="DiffPerc" caption="Yüzde Fark" alignment="center" width={150} />
      <Summary>
        <TotalItem showInColumn="Code" summaryType="count" />
        <TotalItem showInColumn="SumTarget" column="SumTarget" summaryType="sum" valueFormat="fixedpoint" />
        <TotalItem showInColumn="SumActual" column="SumActual" summaryType="sum" valueFormat="fixedpoint" />
      </Summary>
    </DataGrid>
  );
};

export default App;

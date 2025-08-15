import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';

const App = ({ product }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  const fetchData = async () => {
    setOrderHistoryStore(product);
  };

  useEffect(() => {
    fetchData();
  }, [product]);

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

      <Column dataField="UnitName" caption="Birim Adı" alignment="center" />
      <Column dataField="SiloName" caption="Silo Ad" alignment="center" />
      <Column dataField="MatCode" caption="Mamül Kod" alignment="center" />
      <Column dataField="MatName" caption="Mamül Ad" alignment="center" />
      <Summary>
        <TotalItem showInColumn="SiloName" summaryType="count" />
      </Summary>
    </DataGrid>
  );
};

export default App;

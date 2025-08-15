import React, { useEffect, useState } from 'react';
import { Column, DataGrid, MasterDetail, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';
import MasterDetailView from './MasterDetailView';
import '../Devextreme.css';

const App = ({ product, details, isUpdate, onRowSelect }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  useEffect(() => {
    setOrderHistoryStore(product);
  }, [isUpdate]);

  const handleSelectionChanged = (e) => {
    if (onRowSelect && e.selectedRowsData?.length > 0) {
      const selectedRows = e.selectedRowsData.map((row) => ({
        ...row,
        detail: details?.filter((d) => d.formulaId === row.id)
      }));
      onRowSelect(selectedRows); // Tüm satırları parent'a gönder
    }
  };

  return (
    <DataGrid
      dataSource={orderHistoryStore}
      remoteOperations={false}
      showBorders={true}
      allowColumnReordering={true}
      columnHidingEnabled={true}
      id="gridContainer"
      selection={{ mode: 'multiple' }}
      onSelectionChanged={handleSelectionChanged}
    >
      <Pager allowedPageSizes={[10, 20, 50]} showPageSizeSelector={true} showNavigationButtons={true} />
      <GroupPanel visible={true} emptyPanelText="İstediğiniz alana göre gruplamak için sütun başlığını buraya sürükleyiniz." />
      <SearchPanel visible={true} width={310} />
      <MasterDetail enabled={true} component={(props) => <MasterDetailView {...props} details={details} />} />
      <Paging defaultPageSize={10} />

      <Column dataField="formulaCode" caption="Formül Kod" alignment="center" />
      <Column dataField="formulaName" caption="Formül Ad" alignment="left" />
      <Column dataField="amount" caption="Miktar" alignment="center" />
      <Column dataField="createDate" dataType="date" caption="Başlangıç T." alignment="center" format="dd.MM.yyyy HH.mm" />

      <Summary>
        <TotalItem showInColumn="formulaCode" column="targetCount" summaryType="count" />
      </Summary>
    </DataGrid>
  );
};

export default App;

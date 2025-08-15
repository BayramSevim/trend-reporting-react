import React, { useEffect, useState } from 'react';
import { Column, DataGrid, MasterDetail, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import MasterDetailView from './MasterDetailView';
import { GetAPIUrl } from '../../../api/gama';

const App = ({ user, isUpdate }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  useEffect(() => {
    setOrderHistoryStore(user);
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
      {/* <MasterDetail enabled={true} component={MasterDetailView} /> */}
      <Paging defaultPageSize={10} />

      <Column dataField="UserName" caption="Kullanıcı Adı" alignment="center" />
      <Column dataField="Password" caption="Şifre" alignment="center" />
      <Column dataField="IsActive" caption="Aktiflik Durumu" alignment="center" />
      <Summary>
        <TotalItem showInColumn="UserName" column="UserName" summaryType="count" />
      </Summary>
    </DataGrid>
  );
};

export default App;

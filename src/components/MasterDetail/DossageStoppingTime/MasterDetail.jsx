import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';

import { GetAPIUrl } from '../../../api/gama';

const App = ({ date, shift, isUpdate }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  useEffect(() => {
    const url = `${GetAPIUrl()}/api/Product/GetDossageStoppingTime?date=${date}&shift=${shift}`;

    const suppliersData = createStore({
      key: 'StartedDate',
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

      <Column dataField="WorkingTime" dataType="date" caption="Çalışma Zamanı" alignment="center" format="HH.mm" />
      <Column dataField="StoppingTime" dataType="date" caption="Duruş Zamanı" alignment="center" format="HH.mm" />
      <Column dataField="StartedDate" dataType="date" caption="Başlama Zamanı" alignment="center" format="dd.MM.yyyy HH.mm" />
      <Column dataField="EndedDate" dataType="date" caption="Bitiş Zamanı" alignment="center" format="dd.MM.yyyy HH.mm" />
      <Summary>
        <TotalItem showInColumn="siloName" summaryType="count" />
      </Summary>
    </DataGrid>
  );
};

export default App;

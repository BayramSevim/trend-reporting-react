import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, Summary, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { GetAPIUrl } from 'api/gama';

const BatchHistory = ({ packageId }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  useEffect(() => {
    if (packageId) {
      const url = `${GetAPIUrl()}/api/Package/GetPackDetail?packId=${packageId}`;

      const suppliersData = createStore({
        key: 'Id',
        loadUrl: url
      });
      setOrderHistoryStore(suppliersData);
    }
  }, [packageId]);

  return (
    <DataGrid dataSource={orderHistoryStore} showBorders={true}>
      <Paging defaultPageSize={10} />
      <Column dataField="CreatedDate" dataType="date" caption="Başlangıç Tarihi" alignment="center" />
      <Column dataField="TargetAmount" caption="Teorik M." alignment="center" />
      <Column dataField="ActualAmount" caption="Pratik M." alignment="center" />

      <Summary>
        <TotalItem column="Amount" summaryType="sum">
          <ValueFormat precision={2} />
        </TotalItem>
      </Summary>
    </DataGrid>
  );
};

export default BatchHistory;

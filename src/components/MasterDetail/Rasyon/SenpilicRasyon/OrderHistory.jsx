import React, { useEffect, useState } from 'react';
import { Column, DataGrid, Paging, Summary, TotalItem, ValueFormat } from 'devextreme-react/data-grid';

const OrderHistory = ({ productId, details }) => {
  const [filteredDetails, setFilteredDetails] = useState([]);

  useEffect(() => {
    // sadece ilgili formülün detaylarını al
    const relatedDetails = details.filter((item) => item.formulaId === productId.id);
    setFilteredDetails(relatedDetails);
  }, [productId, details]);

  return (
    <DataGrid dataSource={filteredDetails} showBorders={true}>
      <Paging defaultPageSize={15} />
      <Column dataField="stockNo" caption="Stok No" alignment="center" />
      <Column dataField="stockName" caption="Stok Ad" alignment="center" />
      <Column dataField="amount" caption="Miktar" alignment="center" />
      <Summary>
        <TotalItem column="amount" summaryType="sum">
          <ValueFormat precision={2} />
        </TotalItem>
      </Summary>
    </DataGrid>
  );
};

export default OrderHistory;

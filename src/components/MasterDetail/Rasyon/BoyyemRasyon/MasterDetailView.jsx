import React, { useCallback } from 'react';
import { TabPanel, Item } from 'devextreme-react/tab-panel';
import OrdersTab from './OrdersTab';

const MasterDetailView = (props) => {
  const renderOrdersTab = useCallback(() => <OrdersTab id={props.data.key} details={props.details} />, [props.data.key, props.details]);

  return (
    <TabPanel>
      <Item title="Formül Detayları" render={renderOrdersTab} />
    </TabPanel>
  );
};

export default MasterDetailView;

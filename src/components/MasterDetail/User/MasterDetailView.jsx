import React, { useCallback } from 'react';
import { TabPanel, Item } from 'devextreme-react/tab-panel';
// import { DataGridTypes } from 'devextreme-react/data-grid';

import UserDetail from './UserDetail';

const MasterDetailView = (props) => {
  const renderBatchTab = useCallback(() => <UserDetail id={props.data.key} />, [props.data.key]);

  return (
    <TabPanel>
      <Item title="Kullanıcı Detayları" render={renderBatchTab} />
    </TabPanel>
  );
};

export default MasterDetailView;

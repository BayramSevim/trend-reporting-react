import React, { useCallback } from 'react';
import { TabPanel, Item } from 'devextreme-react/tab-panel';
// import { DataGridTypes } from 'devextreme-react/data-grid';

import VakumDetail from './VakumDetail';

const MasterDetailView = (props) => {
  const renderBatchTab = useCallback(() => <VakumDetail id={props.data.key} />, [props.data.key]);

  return (
    <TabPanel>
      <Item title="Vakum Detayları" render={renderBatchTab} />
    </TabPanel>
  );
};

export default MasterDetailView;

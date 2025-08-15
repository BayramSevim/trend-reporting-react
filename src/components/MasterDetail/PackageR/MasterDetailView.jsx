import React, { useCallback } from 'react';
import { TabPanel, Item } from 'devextreme-react/tab-panel';
// import { DataGridTypes } from 'devextreme-react/data-grid';

import PackageDetail from './PackageDetail';

const MasterDetailView = (props) => {
  const renderBatchTab = useCallback(() => <PackageDetail id={props.data.key} />, [props.data.key]);

  return (
    <TabPanel>
      <Item title="Paketleme Detayları" render={renderBatchTab} />
    </TabPanel>
  );
};

export default MasterDetailView;

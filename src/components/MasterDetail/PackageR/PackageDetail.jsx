import React, { useCallback } from 'react';
import { Form, Item } from 'devextreme-react/form';
import PackageHistory from './PackageHistory';

const OrdersTab = (props) => {
  const renderOrderHistory = useCallback(() => <PackageHistory productId={props.id} />, [props.id]);

  return (
    <Form labelLocation="top" className="form-container">
      <Item render={renderOrderHistory} />
    </Form>
  );
};

export default OrdersTab;

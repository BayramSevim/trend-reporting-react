import React, { useCallback } from 'react';
import { Form, Item } from 'devextreme-react/form';

import OrderHistory from './OrderHistory';

const OrdersTab = (props) => {
  const renderOrderHistory = useCallback(() => <OrderHistory productId={props.id} details={props.details} />, [props.id, props.details]);

  return (
    <Form labelLocation="top" className="form-container">
      <Item render={renderOrderHistory} />
    </Form>
  );
};

export default OrdersTab;

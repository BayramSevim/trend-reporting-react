import React, { useCallback } from 'react';
import { Form, Item } from 'devextreme-react/form';
import VakumHistory from './VakumHistory';

const OrdersTab = (props) => {
  const renderOrderHistory = useCallback(() => <VakumHistory vakumId={props.id} />, [props.id]);

  return (
    <Form labelLocation="top" className="form-container">
      <Item render={renderOrderHistory} />
    </Form>
  );
};

export default OrdersTab;

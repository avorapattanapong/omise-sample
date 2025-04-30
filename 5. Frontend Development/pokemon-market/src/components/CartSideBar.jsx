import {Button, Col, Divider, Drawer, List, Row, Space, Typography} from 'antd';
import CartItem from './CartItem';
import useApp from "../redux/hooks/app.js";
import useCart from "../redux/hooks/cart.js";
import React from "react";

const { Text } = Typography;

function CartSidebar() {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
  } = useApp();

  const {
    cartItems,
    updateCardQuantity,
    emptyCart,
  } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.cardmarket.prices.averageSellPrice * item.quantity, 0).toFixed(2);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Drawer
      title="Cart"
      onClose={closeCartDrawer}
      open={isCartDrawerOpen}
      extra={
        <Space>
          <Button color="default" variant="link" onClick={emptyCart}>
            Clear Cart
          </Button>
        </Space>
      }
      footer={
        <div style={{ padding: '15px 10px' }}>
          <Row>
            <Col span={12}>
              <Text strong>Total Price:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text>${totalPrice}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text strong>Total Card Amount:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text>{totalAmount}</Text>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <Button type="primary" block>Proceed to Checkout</Button>
            </Col>
          </Row>
        </div>
      }
    >
      {cartItems.length !== 0 ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
            <div style={{display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                <Text>Item</Text>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                <Text>Name / Price per unit</Text>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'flex-end'}}>
                <Text>Price</Text>
              </div>
            </div>
          </div>
          <Divider />
        </>
      ):null}
      <List
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            key={item.id}
          >
            <CartItem item={item} onUpdateQuantity={updateCardQuantity} />
          </List.Item>
        )}
      />
    </Drawer>
  );
}

export default CartSidebar;

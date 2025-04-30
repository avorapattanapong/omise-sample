import {InputNumber} from 'antd';

function CartItem({ item, onUpdateQuantity }) {
  const pricePerItem = item.cardmarket.prices.averageSellPrice.toFixed(2);
  const totalPrice = (item.quantity * pricePerItem).toFixed(2);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 10}}>
      <div style={{display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
          <img
            src={item.images.small}
            alt={item.name}
            style={{ width: 50, height: 70}}
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 4}}>
          <div style={{ fontWeight: 500 }}>{item.name}</div>
          <div>${pricePerItem}</div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'flex-end'}}>
          <div>${totalPrice}</div>
        </div>
      </div>
      <div style={{display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', flexDirection: 'column', flexGrow: 4}}>
          <InputNumber
            addonBefore="Quantity"
            min={0}
            value={item.quantity}
            onChange={(value) => onUpdateQuantity(item.id, value)}
            size="large"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;

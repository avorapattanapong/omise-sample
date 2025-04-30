import {Card, Button, Row, Col} from 'antd';
import {useDispatch} from "react-redux";
import {addToCart} from "../redux/slices/cart.js";

function CardItem({ card }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(card));
  }
  return (
    <Card
      hoverable
      cover={<img alt={card.name} src={card.images.small} />}
      bodyStyle={{ textAlign: 'center' }}
    >
      <Card.Meta title={card.name} />
      <Row>
        <Col span={8}>
          <p style={{ margin: '8px 0' }}>
            Price: ${card.cardmarket?.prices?.averageSellPrice ?? 'N/A'}
          </p>
        </Col>
        <Col span={8} offset={8}>
          <p style={{ margin: '8px 0' }}>
            {card.set.total ?? 'Out of Stock'} {card.set.total > 0 ? 'Cards' : ''}
          </p>
        </Col>
      </Row>

      <Button type="primary" block onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Card>
  );
}

export default CardItem;

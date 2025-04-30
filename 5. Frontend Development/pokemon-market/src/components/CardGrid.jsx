import { Row, Col } from 'antd';
import CardItem from './CardItem';
import usePokemonCards from "../redux/hooks/pokemon.js";

function CardGrid() {
  const {
    cards,
  } = usePokemonCards();

  return (
    <Row gutter={[16, 16]}>
      {cards.map(card => (
        <Col
          key={card.id}
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={6}
        >
          <CardItem card={card} />
        </Col>
      ))}
    </Row>
  );
}

export default CardGrid;

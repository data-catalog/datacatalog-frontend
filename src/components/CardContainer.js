import { CardDeck } from 'react-bootstrap';
import styled from 'styled-components';

const CardContainer = styled(CardDeck)`
  flex-wrap: wrap;
  width: auto;

  .card {
    flex-basis: 20rem;
    margin: 1rem;
  }
`;

export default CardContainer;

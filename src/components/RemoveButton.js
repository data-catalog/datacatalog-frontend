import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const RemoveButton = styled(Button)`
  display: inline-flex;
  align-items: baseline;
  background: none;
  border: none;
  color: var(--dark);

  &:hover {
    background: none;
    border: none;
    color: var(--danger);
  }
`;

export default RemoveButton;

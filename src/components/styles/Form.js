import styled from 'styled-components';

const Form = styled.form`
  width: 15em;
  padding: 15px 35px 40px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.back_color};
  text-align: center;
  color: white;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
`;

const Input = styled.input`
  font-size: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-top: 5px;
  padding-right: 10%;
  transform: translateY(-5%);
  border: none;

  &.error {
    border-color: red;
  }

  &:focus {
    z-index: 2;
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.lightblue};
  padding: 10px 12px;
  font-size: 150%;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${(props) => props.theme.button_darker};
    color: black;
  }

  &:disabled {
    // TODO: style this
    background-color: grey;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export { Form, FormGroup, Input, Button };

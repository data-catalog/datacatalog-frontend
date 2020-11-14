import styled from 'styled-components';

const FilterButton = styled.button`
  width: 40px;
  height: 36px;
  border: 1px solid #00b4cc;
  background: #00b4cc;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: flex-start;
  background-color: ${(props) => props.theme.back_color};
  flex-direction: column;
`;

const FilterHeader = styled.h2`
  color: white;
  align-self: center;
`;

const OrderBySelect = styled.select`
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.lightblue};
  height: 2em;
  border-radius: 8px;
  background-color: ${(props) => props.theme.lightblue};
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  color: white;
  text-align: center;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${(props) => props.theme.button_darker};
    border: 1px solid ${(props) => props.theme.button_darker};
    color: black;
  }
`;

const SelectOption = styled.option`
  color: white;
`;

const FilterForm = styled.div``;

const Form = styled.form`
  width: 25em;
  height: 15em;
  padding: 15px 35px 40px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.back_color};
  text-align: center;
  color: white;
  align-self: center;
`;

const Input = styled.input`
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.lightblue};
  height: 1.5em;
  background-color: ${(props) => props.theme.lightblue};
  color: white;
  padding: 12px 20px;
  margin: 8px 0;

  ::placeholder {
    color: white;
    opacity: 0.8;
    text-align: center;
  }
`;

const FieldLabel = styled.p`
  color: white;
  font-size: 130%;
`;

const Button = styled.button`
  background: ${(props) => props.theme.lightblue};
  padding: 10px 12px;
  border-radius: 8px;
  margin: 5px;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  align-content: center;
  margin-bottom: 5%;
`;

export {
  FilterButton,
  ModalContainer,
  FilterHeader,
  FilterForm,
  Form,
  Input,
  FieldLabel,
  OrderBySelect,
  SelectOption,
  Button,
  ButtonContainer,
};

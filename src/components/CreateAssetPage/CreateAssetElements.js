import styled from 'styled-components';

const CreateAssetHeader = styled.div`
  color: white;
  display: flex;
  margin-bottom: 1%;
`;

const CreateAssetBody = styled.div`
  display: flex;
`;

const CreateAssetTitle = styled.div`
  font-size: 120%;
  flex: 0 0 30%;
`;

const StepTitle = styled.div`
  font-size: 120%;
  color: white;
`;

const ButtonContainer = styled.div`
  flex: 0 0 18%;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
`;

const Button = styled.button`
  color: white;
  border-radius: 8px;
  background-color: ${(props) => props.theme.button_darker};
  border: 1px solid white;
  font-size: 120%;
  margin-right: 5%;

  &:hover {
    background-color: ${(props) => props.theme.lightblue};
  }
`;

const StepInput = styled.input`
  border: 1px solid white;
  background-color: #00b4cc;
  width: 150%;
  padding: 5px;
  outline: none;
  color: white;
`;

const CreateAssetWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreateAssetSelect = styled.select`
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

export {
  CreateAssetHeader,
  CreateAssetTitle,
  ButtonContainer,
  Button,
  CreateAssetBody,
  StepTitle,
  StepInput,
  CreateAssetWrapperDiv,
  CreateAssetSelect,
  SelectOption,
};

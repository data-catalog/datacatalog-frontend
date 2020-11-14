import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react/headless';
import { BsExclamationCircle } from 'react-icons/bs';

const Form = styled.form`
  width: 15em;
  padding: 15px 35px 40px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.back_color};
  text-align: center;
  color: white;
  margin-bottom: -10%;
  margin-top: -5%;
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

const PopperContainer = styled.div`
  background: ${(props) => props.theme.input_error};
  color: white;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  z-index: 10;
  max-width: 200px;
  transform: translateX(-3%);
`;

const Arrow = styled.div`
  &::before {
    position: absolute;
    width: 6px;
    height: 6px;
    z-index: -1;
  }

  ::before {
    content: '';
    transform: rotate(45deg);
    background: ${(props) => props.theme.input_error};
  }
`;

const ExclamationMark = styled.span`
  margin-right: 0.5rem;
  font-size: 1em;
  color: ${(props) => props.theme.input_error};
  transform: translate(50%, 15%);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  border-radius: 8px;
  border: ${(props) => (props.error ? '2px solid red' : null)};
  padding: 0.6rem;
  background-color: white;
  background-size: 50%;
  margin-bottom: 5%;
  width: 100%;
`;

const ErrorTooltip = ({ message }) => {
  return (
    <>
      <Tippy
        placement="top-end"
        arrow="true"
        render={(attrs) => (
          <PopperContainer {...attrs}>
            {message}
            <Arrow data-popper-arrow />
          </PopperContainer>
        )}
      >
        <ExclamationMark>
          <BsExclamationCircle />
        </ExclamationMark>
      </Tippy>
    </>
  );
};

export { Form, FormGroup, Input, Button, InputContainer, ErrorTooltip };

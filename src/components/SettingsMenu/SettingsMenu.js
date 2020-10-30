import React, { useState } from 'react'
import { BsPerson, BsGear, BsChevronDoubleLeft } from 'react-icons/bs'
import { BiUserPin } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { ThemeProvider } from 'styled-components';
import { ItemHolder, LeftIcon, RightIcon, OptionsHolder, Menu, WelcomeHolder } from './SettingsMenuStyled';
import { Colors } from '../Global/Colors'
import { CSSTransition } from 'react-transition-group'

export const SettingsMenu = () => {

  const [activeMenu, setActiveMenu] = useState('main');
  const [optionsHeight, setOptionsHeight] = useState(null);

  const calculateHeight = (element) => {
    const height = element.offsetHeight;
    setOptionsHeight(height);
  }

  const DropdownItem = (props) => {
    return (
      <ItemHolder onClick = {() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <LeftIcon>{props.leftIcon}</LeftIcon>
        {props.children}
        <RightIcon>{props.rightIcon}</RightIcon>
      </ItemHolder>
    );
  }

  return (
    <ThemeProvider theme={Colors}>
      <OptionsHolder style={{height: optionsHeight}}>
        <CSSTransition
          in={activeMenu === 'main'}
          unmountOnExit
          timeout={500}
          classNames='menu-primary'
          onEnter={calculateHeight}>

          <Menu>
            <WelcomeHolder>
              Welcome, User!
            </WelcomeHolder>
            <DropdownItem leftIcon={<BsPerson/>}>
              Log in!
            </DropdownItem>
            <DropdownItem leftIcon={<BsGear/>}
                          goToMenu="settings">
              Settings
            </DropdownItem>
          </Menu>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === 'settings'}
          unmountOnExit
          timeout={500}
          classNames='menu-secondary'
          onEnter={calculateHeight}>

          <Menu>
            <DropdownItem leftIcon={<BsChevronDoubleLeft/>}
                          goToMenu="main">
              Back
            </DropdownItem>
            <DropdownItem leftIcon={<BiUserPin/>}>
              Change Username
            </DropdownItem>
            <DropdownItem leftIcon={<AiOutlineMail/>}>
              Change Email
            </DropdownItem>
          </Menu>
        </CSSTransition>
      </OptionsHolder>
    </ThemeProvider>
  );
}

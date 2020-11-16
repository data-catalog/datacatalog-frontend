import React, { useState } from 'react';
import { BsPerson, BsGear, BsChevronDoubleLeft, BsQuestionCircle, BsClipboardData } from 'react-icons/bs';
import { BiUserPin, BiKey } from 'react-icons/bi';
import { AiOutlineMail, AiOutlineSmile } from 'react-icons/ai';
import { ThemeProvider } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal';
import { ItemHolder, LeftIcon, OptionsHolder, Menu, WelcomeHolder } from './SettingsMenuStyled';
import { Colors } from '../Global/Colors';
import LoginModal from './AuthModals/LoginModal';
import { useAuth } from '../../context/AuthContext';

Modal.setAppElement('#root');

const DropdownItem = ({ leftIcon, children, onClick }) => {
  return (
    <ItemHolder onClick={onClick}>
      <LeftIcon>{leftIcon}</LeftIcon>
      {children}
    </ItemHolder>
  );
};

const LoginItem = ({ leftIcon, toggleMenu, children }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <ItemHolder
        onClick={() => {
          setLoginOpen(true);
        }}
      >
        <LeftIcon>{leftIcon}</LeftIcon>
        {children}
      </ItemHolder>

      <Modal
        isOpen={isLoginOpen}
        onRequestClose={() => setLoginOpen(false)}
        contentLabel="Login Modal"
        className="LoginModal"
        closeTimeoutMS={500}
      >
        <LoginModal toggleMenu={toggleMenu} toggleLoginModal={setLoginOpen} />
      </Modal>
    </>
  );
};

const FirstPageSettings = ({ user, logout, setActiveMenu, toggleMenu }) => {
  if (user) {
    return (
      <>
        <WelcomeHolder>
          <LeftIcon>
            <AiOutlineSmile />
          </LeftIcon>
          Welcome, {user.username}!
        </WelcomeHolder>
        <DropdownItem leftIcon={<BsGear />} onClick={() => setActiveMenu('settings')}>
          Settings
        </DropdownItem>
        <DropdownItem
          leftIcon={<BiKey />}
          onClick={() => {
            logout();
            toggleMenu(false);
          }}
        >
          Log out
        </DropdownItem>
      </>
    );
  }

  return (
    <>
      <WelcomeHolder>
        <LeftIcon>
          <BsQuestionCircle />
        </LeftIcon>
        Log in to see more features!
      </WelcomeHolder>
      <LoginItem leftIcon={<BsPerson />} toggleMenu={toggleMenu} goToModal="login">
        Log in!
      </LoginItem>
    </>
  );
};

const SettingsMenu = ({ toggleMenu }) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [optionsHeight, setOptionsHeight] = useState(null);
  const { user, logout } = useAuth();

  const calculateHeight = (element) => {
    const height = element.offsetHeight;
    setOptionsHeight(height);
  };

  return (
    <ThemeProvider theme={Colors}>
      <OptionsHolder style={{ height: optionsHeight }}>
        <CSSTransition
          in={activeMenu === 'main'}
          unmountOnExit
          timeout={500}
          classNames="menu-primary"
          onEnter={calculateHeight}
        >
          <Menu>
            <FirstPageSettings user={user} logout={logout} setActiveMenu={setActiveMenu} toggleMenu={toggleMenu} />
          </Menu>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === 'settings'}
          unmountOnExit
          timeout={500}
          classNames="menu-secondary"
          onEnter={calculateHeight}
        >
          <Menu>
            <DropdownItem leftIcon={<BsChevronDoubleLeft />} onClick={() => setActiveMenu('main')}>
              Back
            </DropdownItem>
            <DropdownItem leftIcon={<BsClipboardData />}>Import dataset</DropdownItem>
            <DropdownItem leftIcon={<BiUserPin />}>Change Username</DropdownItem>
            <DropdownItem leftIcon={<AiOutlineMail />}>Change Email</DropdownItem>
          </Menu>
        </CSSTransition>
      </OptionsHolder>
    </ThemeProvider>
  );
};

export default SettingsMenu;

import React, { useState } from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavHome,
  RightWrapper
} from './NavbarElements';
import Searchbar from '../Searchbar/Searchbar'
import { BsPerson } from 'react-icons/bs'
import { SettingsMenu } from '../SettingsMenu/SettingsMenu'

const SettingsButton = (props) => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <NavBtn>
        <NavBtnLink onClick={() => setOpen(!open)}> {props.icon} </NavBtnLink>
        {open && props.children}
      </NavBtn>
    </>
  );
};

const Navbar = (props) => {
  return (
    <>
      <Nav>
        <RightWrapper>
          <NavHome to='/'>
            Data Catalog
          </NavHome>
          <Searchbar {...props} />
        </RightWrapper>
        <Bars />
        <NavMenu>
          <NavLink to='/about'>
            Explore
          </NavLink>
          <NavLink to='/services'>
            Library
          </NavLink>
        </NavMenu>
        <SettingsButton icon={<BsPerson/>}>
          <SettingsMenu/>
        </SettingsButton>
      </Nav>
    </>
  );
};

export default Navbar;
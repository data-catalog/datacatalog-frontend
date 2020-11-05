import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavHome, RightWrapper } from './NavbarElements';
import Searchbar from '../SearchBar/SearchBar';
import SettingsMenu from '../SettingsMenu/SettingsMenu';

const SettingsButton = (props) => {
  const [open, setOpen] = useState(false);

  const { icon, children } = props;

  return (
    <>
      <NavBtn>
        <NavBtnLink onClick={() => setOpen(!open)}> {icon} </NavBtnLink>
        {open && children}
      </NavBtn>
    </>
  );
};

const Navbar = (props) => {
  return (
    <>
      <Nav>
        <RightWrapper>
          <NavHome to="/">Data Catalog</NavHome>
          <Searchbar {...props} />
        </RightWrapper>
        <Bars />
        <NavMenu>
          <NavLink to="/about">Explore</NavLink>
          <NavLink to="/services">Library</NavLink>
        </NavMenu>
        <SettingsButton icon={<BsPerson />}>
          <SettingsMenu />
        </SettingsButton>
      </Nav>
    </>
  );
};

export default Navbar;

import React from 'react';
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
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {
  return (
    <>
      <Nav>
        <RightWrapper>
          <NavHome to='/' activeStyle>
            Data Catalog
          </NavHome>
          <SearchBar/>
        </RightWrapper>
        <Bars />
        <NavMenu>
          <NavLink to='/about' activeStyle>
            Explore
          </NavLink>
          <NavLink to='/services' activeStyle>
            Library
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
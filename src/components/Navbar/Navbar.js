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
import Searchbar from '../Searchbar/Searchbar'

const Navbar = (props) => {
  return (
    <>
      <Nav>
        <RightWrapper>
          <NavHome to='/'>
            Data Catalog
          </NavHome>
          <Searchbar {...props}/>
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
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavHome,
  RightWrapper,
  LeftWrapper,
  UsernameContainer,
} from './NavbarElements';
import Searchbar from '../SearchBar/SearchBar';
import SettingsMenu from '../SettingsMenu/SettingsMenu';

const SettingsButton = (props) => {
  const [open, setOpen] = useState(false);

  const { user, icon, children } = props;

  return (
    <>
      <LeftWrapper>
        <NavBtn>
          <NavBtnLink onClick={() => setOpen(!open)}> {icon} </NavBtnLink>
          {open && children(setOpen)}
        </NavBtn>
        {user && <UsernameContainer>{user.username}</UsernameContainer>}
      </LeftWrapper>
    </>
  );
};

const Navbar = () => {
  const { user } = useAuth();

  return (
    <>
      <Nav>
        <RightWrapper>
          <NavHome to="/">Data Catalog</NavHome>
          <Searchbar />
        </RightWrapper>
        <Bars />
        <NavMenu>
          <NavLink to="/about">Explore</NavLink>
          <NavLink to="/services">Library</NavLink>
        </NavMenu>
        <SettingsButton user={user} icon={<BsFillPersonFill />}>
          {(toggleMenu) => <SettingsMenu toggleMenu={toggleMenu} />}
        </SettingsButton>
      </Nav>
    </>
  );
};

export default Navbar;
export { SettingsButton };

import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const RightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  align-items: center;
  margin-left: 24px;
`;

export const NavHome = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 200%;
  padding: 0 0 1% 0;
`;

export const Nav = styled.nav`
  border-bottom: 1px solid white;
  background: #095e6d;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  z-index: 10;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: #fff;
  font-size: larger;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  background-repeat: no-repeat;
  background-size: 80% 0.2em;
  background-position: center bottom;
  transition: background-size 0.25s ease-in;
  &:hover {
    background-size: 100% 88%;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled.button`
  border-radius: 50%;
  background: #00b4cc;
  padding: 10px 12px;
  font-size: 150%;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

export const LeftWrapper = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
`;

export const UsernameContainer = styled.div`
  color: white;
  font-size: 110%;
`;

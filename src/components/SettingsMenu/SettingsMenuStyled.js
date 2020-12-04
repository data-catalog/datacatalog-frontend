import styled from 'styled-components';

export const ItemHolder = styled.a`
  height: 50px;
  display: flex;
  align-items: center;
  justify-items: center;
  border-radius: 8px;
  transition: background 300ms;
  padding: 0.5rem;
  cursor: default;

  &:hover {
    background-color: ${(props) => props.theme.lightblue};
  }
`;

export const WelcomeHolder = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-items: center;
  text-align: center;
  border-radius: 8px;
  transition: background 300ms;
  padding: 0.5rem;
  cursor: default;
`;

export const LeftIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 150%;
  transform: translateY(10%);
`;

export const Menu = styled.div`
  &.menu-primary-enter {
    position: absolute;
    transform: translateX(-110%);
  }
  &.menu-primary-enter-active {
    transform: translateX(0%);
    transition: all 500ms ease;
  }
  &.menu-primary-exit {
    position: absolute;
  }
  &.menu-primary-exit-active {
    transform: translateX(-110%);
    transition: all 500ms ease;
  }
  &.menu-secondary-enter {
    transform: translateX(110%);
  }
  &.menu-secondary-enter-active {
    transform: translateX(0%);
    transition: all 500ms ease;
  }
  &.menu-secondary-exit {
  }
  &.menu-secondary-exit-active {
    transform: translateX(110%);
    transition: all 500ms ease;
  }
`;

export const OptionsHolder = styled.div`
  position: absolute;
  top: 80px;
  width: 200px;
  transform: translateX(-60%);
  background-color: ${(props) => props.theme.sidebar_color};
  border: 1px solid ${(props) => props.theme.white};
  border-radius: 8px;
  overflow: hidden;
  transition: height 300ms ease;
  z-index: 100;
  color: ${(props) => props.theme.white};
`;

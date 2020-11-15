import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';
import { Colors } from '../Global/Colors';

const WindowContainer = styled.div`
  position: absolute;
  top: 97px;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
`;

const Content = styled.div`
  overflow: auto;
`;

const SearchInfo = styled.div`
  color: ${(props) => props.theme.white};
`;

const MainSideContainer = styled.div`
  background-color: ${(props) => props.theme.back_color};
  padding: 0.5% 0% 1% 1%;
  flex: 1;
  display: flex;
  overflow: visible;
  flex-direction: column;
`;

const AppWrapper = () => {
  return (
    <>
      <ThemeProvider theme={Colors}>
        <WindowContainer>
          <Sidebar />
          <Main />
        </WindowContainer>
      </ThemeProvider>
    </>
  );
};

const Main = () => {
  return (
    <MainSideContainer>
      <Content>
        <SearchInfo />
      </Content>
    </MainSideContainer>
  );
};

export default AppWrapper;

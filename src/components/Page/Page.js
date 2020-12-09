import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Colors } from '../Global/Colors';

const WindowContainer = styled.div`
  position: absolute;
  top: 97px;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
`;

const MainSideContainer = styled.div`
  background-color: ${(props) => props.theme.back_color};
  padding: 2% 2% 2% 2%;
  flex: 1;
  display: flex;
  overflow: visible;
  flex-direction: column;
`;

const Page = ({ children }) => {
  return (
    <>
      <Navbar />

      <ThemeProvider theme={Colors}>
        <WindowContainer>
          <Sidebar />
          <MainSideContainer>{children}</MainSideContainer>
        </WindowContainer>
      </ThemeProvider>
    </>
  );
};

export default Page;

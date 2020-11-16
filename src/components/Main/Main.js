import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Collapsible from 'react-collapsible';
import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiArrowDropDownLine } from 'react-icons/ri';

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
  font-size: 110%;
  margin-bottom: 2%;
`;

const MainSideContainer = styled.div`
  background-color: ${(props) => props.theme.back_color};
  padding: 2% 2% 2% 2%;
  flex: 1;
  display: flex;
  overflow: visible;
  flex-direction: column;
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DetailsRow = styled.div`
  min-width: 98%;
  max-width: 98%;
  background-color: ${(props) => props.theme.detail_color};
  border: 1px solid ${(props) => props.theme.white};
  border-top: none;
  padding: 5px;
  display: flex;
`;

const DetailsText = styled.span`
  color: white;
  font-size: 110%;
`;

const CustomHeader = styled.div`
  background-color: ${(props) => props.theme.header_color};
  color: ${(props) => props.theme.font_color};
  cursor: pointer;
  padding: 18px;
  text-align: left;
  border: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.back_color}; ;
`;

const HeaderOwnerIcon = styled(FaRegUserCircle)`
  color: ${(props) => props.theme.white};
  transform: translateY(5%);
  font-size: 250%;
`;

const HeaderOwnerInfo = styled.div`
  font-size: 110%;
  margin-left: 1%;
`;

const HeaderUploadDate = styled.div`
  font-size: 110%;
  margin-left: 40%;
`;

const HeaderSize = styled.div`
  font-size: 110%;
  margin-left: 1%;
`;

const HeaderHamburger = styled(GiHamburgerMenu)`
  color: ${(props) => props.theme.white};
  font-size: 200%;
  margin-left: 10%;
`;

const HeaderArrow = styled(RiArrowDropDownLine)`
  color: ${(props) => props.theme.white};
  font-size: 250%;
`;

const DataHeader = () => {
  return (
    <>
      <CustomHeader>
        <HeaderOwnerIcon />
        <HeaderOwnerInfo>username/datasetname</HeaderOwnerInfo>
        <HeaderUploadDate>Upload date: 2020.06.09. 04:20 GMT</HeaderUploadDate>
        <HeaderSize>Size: 156 MB</HeaderSize>
        <HeaderHamburger />
        <HeaderArrow />
      </CustomHeader>
    </>
  );
};

const DataDetails = () => {
  return (
    <DetailsContainer>
      <DetailsRow>
        <DetailsText>
          Description goes here. The description is usually a really really long text so it is important to consider
          that it will probably span a lot of rows. Description goes here. The description is usually a really really
          long text so it is important to consider that it will probably span a lot of rows. Description goes here. The
          description is usually a really really long text so it is important to consider that it will probably span a
          lot of rows. Description goes here. The description is usually a really really long text so it is important to
          consider that it will probably span a lot of rows.
        </DetailsText>
      </DetailsRow>
      <DetailsRow>
        <DetailsText>URL: https://www.example.com/exampleasset</DetailsText>
      </DetailsRow>
    </DetailsContainer>
  );
};

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

const InfoDiv = () => {
  return (
    <>
      <Collapsible trigger={<DataHeader />}>
        <DataDetails />
      </Collapsible>
      <Collapsible trigger={<DataHeader />}>
        <DataDetails />
      </Collapsible>
      <Collapsible trigger={<DataHeader />}>
        <DataDetails />
      </Collapsible>
      <Collapsible trigger={<DataHeader />}>
        <DataDetails />
      </Collapsible>
      <Collapsible trigger={<DataHeader />}>
        <DataDetails />
      </Collapsible>
    </>
  );
};

const Main = () => {
  return (
    <MainSideContainer>
      <SearchInfo>Results for &apos;wow&apos; (2 results in 4 seconds)</SearchInfo>
      <Content>
        <InfoDiv />
      </Content>
    </MainSideContainer>
  );
};

export default AppWrapper;

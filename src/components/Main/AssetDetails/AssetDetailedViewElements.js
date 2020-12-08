import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TabContainer = styled(Tabs)`
  -webkit-tap-highlight-color: transparent;
`;

const AllTabs = styled(TabList)`
  border-bottom: 1px solid white;
  margin: 0 0 10px;
  padding: 0;
`;

const SingleTab = styled(Tab)`
  display: inline-block;
  border: 1px solid white;
  border-radius: 5px 5px 0 0;
  border-left: none;
  bottom: -1px;
  position: relative;
  color: white;
  list-style: none;
  padding: 6px 12px;
  cursor: pointer;

  &:first-child {
    border-left: 1px solid white;
  }

  &:active {
    background: #fff;
    border-color: #aaa;
    border-radius: 5px 5px 0 0;
  }

  &:focus {
    box-shadow: 0 0 5px hsl(208, 99%, 50%);
    border-color: hsl(208, 99%, 50%);
    outline: none;
  }

  &.is-selected {
    background: ${(props) => props.theme.lightblue};
    border-color: white;
    border-radius: 5px 5px 0 0;
  }
`;

const TabPanelContainer = styled(TabPanel)`
  display: none;

  &.is-selected {
    display: block;
  }
`;

const DescriptionContainer = styled.div`
  background-color: ${(props) => props.theme.detail_color};
  padding: 1%;
  color: white;
`;

const GeneralDataContainer = styled.div`
  background-color: ${(props) => props.theme.detail_color};
  padding: 1%;
  display: flex;
  color: white;
`;

const DetailedViewHeader = styled.div`
  color: white;
  display: flex;
  margin-bottom: 1%;
`;

const AssetTitle = styled.div`
  font-size: 120%;
  flex: 0 0 30%;
`;

const ButtonContainer = styled.div`
  flex: 0 0 18%;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  color: white;
  border-radius: 8px;
  background-color: ${(props) => props.theme.button_darker};
  border: 1px solid white;
  font-size: 120%;
`;

const LeftTableContainer = styled.div`
  flex: 0 0 50%;
  background-color: red;
`;

const RightTableContainer = styled.div`
  flex: 0 0 50%;
  background-color: green;
`;

export {
  ButtonContainer,
  Button,
  TabContainer,
  LeftTableContainer,
  RightTableContainer,
  AssetTitle,
  AllTabs,
  SingleTab,
  TabPanelContainer,
  DescriptionContainer,
  GeneralDataContainer,
  DetailedViewHeader,
};

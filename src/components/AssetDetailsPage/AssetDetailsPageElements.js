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
  border-right: 1px solid white;
  padding-left: 0.5%;
  padding-right: 2%;
`;

const RightTableContainer = styled.div`
  flex: 0 0 48%;
  padding-left: 2%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  table-layout: fixed;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  width: 50%;
  text-align: left;
  font-weight: 600;
  border: 0;
  padding: 5px 0;
  padding-right: 10px;
`;

const TableCell = styled.td`
  text-align: left;
  padding: 5px 0;
  width: 50%;
  word-wrap: break-word;
  border: 0;

  .easy-edit-inline-wrapper > .easy-edit-button-wrapper > .easy-edit-button {
    background: transparent;
    font-size: 110%;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
      transition: all 0.2s ease-in-out;
      background: ${(props) => props.theme.button_darker};
      color: black;
      border-radius: 15px;
    }
  }
`;

const TableBody = styled.tbody``;

const CustomInputDiv = styled.div`
  background-color: transparent;
`;

const Input = styled.input`
  font-size: 16px;
  background-color: transparent;
  margin-top: 5px;
  color: white;
  padding-right: 10%;
  border: none;
  min-width: 0;
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
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  CustomInputDiv,
  Input,
};

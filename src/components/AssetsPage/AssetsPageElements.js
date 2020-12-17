import styled from 'styled-components';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const SearchInfo = styled.div`
  color: ${(props) => props.theme.white};
  font-size: 110%;
  margin-bottom: 2%;
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
  flex: 0 0 88%;
  text-align: justify;
`;

const DetailsTitle = styled.div`
  flex: 0 0 10%;
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
  border-bottom: 1px solid ${(props) => props.theme.back_color};
`;

const HeaderOwnerIcon = styled(FaRegUserCircle)`
  flex: 0 0 5%;
  color: ${(props) => props.theme.white};
  transform: translateY(5%);
  font-size: 250%;
`;

const HeaderOwnerInfo = styled.div`
  flex: 0 1 40%;
  font-size: 110%;
  margin-left: 1%;
`;

const HeaderUploadDate = styled.div`
  flex: 0 0 35%;
  font-size: 110%;
`;

const HeaderSpacing = styled.div`
  flex: 0 1 10%;
`;

const HeaderHamburger = styled.button`
  flex: 0 0 5%;
  color: ${(props) => props.theme.white};
  font-size: 200%;
  transform: translateY(9%);
  outline: none;
  border: none;
  cursor: pointer;
  background: transparent;
  align-items: center;
  text-align: center;

  &:hover {
    color: ${(props) => props.theme.lightblue};
  }
`;

const AssetOptionsContainer = styled.div`
  color: ${(props) => props.theme.white};
  z-index: 100;
  border-bottom: 1px solid ${(props) => props.theme.white};
`;

const AssetOption = styled.a`
  display: flex;
  align-items: center;
  justify-items: center;
  background-color: ${(props) => props.theme.sidebar_color};
  padding: 0.5rem;
  cursor: default;
  border: 1px solid ${(props) => props.theme.white};
  border-bottom: none;

  &:hover {
    background-color: ${(props) => props.theme.lightblue};
  }
`;

const AssetOptionsIcon = styled.span`
  margin-right: 0.5rem;
  flex: 0 0 20%;
  transform: translateY(10%);
  font-size: 130%;
`;

const HeaderArrow = styled(RiArrowDropDownLine)`
  flex: 0 0 5%;
  color: ${(props) => props.theme.white};
  font-size: 250%;
`;

const MoreDetailsButton = styled(Link)`
  background-color: ${(props) => props.theme.back_color};
  color: white;
  border: 1px solid white;
  border-radius: 8px;
  padding: 5px;
  font-size: 90%;

  &:hover {
    background-color: ${(props) => props.theme.lightblue};
  }
`;

export {
  HeaderArrow,
  HeaderHamburger,
  HeaderOwnerIcon,
  HeaderSpacing,
  HeaderUploadDate,
  HeaderOwnerInfo,
  CustomHeader,
  DetailsText,
  DetailsTitle,
  DetailsRow,
  DetailsContainer,
  SearchInfo,
  AssetOptionsContainer,
  AssetOption,
  AssetOptionsIcon,
  MoreDetailsButton,
};

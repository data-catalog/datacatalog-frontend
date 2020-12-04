import styled from 'styled-components';
import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiArrowDropDownLine } from 'react-icons/ri';

const WindowContainer = styled.div`
  position: absolute;
  top: 97px;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  transform: translateY(70%);
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
  flex: 0 0 20%;
  font-size: 110%;
`;

const HeaderSize = styled.div`
  flex: 0 0 10%;
  font-size: 110%;
  margin-left: 3%;
`;

const HeaderSpacing = styled.div`
  flex: 0 1 10%;
`;

const HeaderHamburger = styled(GiHamburgerMenu)`
  flex: 0 0 5%;
  color: ${(props) => props.theme.white};
  font-size: 200%;
`;

const HeaderArrow = styled(RiArrowDropDownLine)`
  flex: 0 0 5%;
  color: ${(props) => props.theme.white};
  font-size: 250%;
`;

export {
  HeaderArrow,
  HeaderHamburger,
  HeaderOwnerIcon,
  HeaderSpacing,
  HeaderSize,
  HeaderUploadDate,
  HeaderOwnerInfo,
  CustomHeader,
  DetailsText,
  DetailsTitle,
  DetailsRow,
  DetailsContainer,
  MainSideContainer,
  Content,
  SearchInfo,
  WindowContainer,
  LoaderContainer,
};

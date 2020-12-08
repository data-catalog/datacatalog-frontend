import React, { useState, forwardRef } from 'react';
import { ThemeProvider } from 'styled-components';
import Collapsible from 'react-collapsible';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineEdit, AiOutlineStar, AiOutlineDelete } from 'react-icons/ai';
import Tippy from '@tippyjs/react/headless';
import { Switch, Route } from 'react-router-dom';
import AssetDetailedView from './AssetDetails/AssetDetailedView';
import {
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
  MainSideContainer,
  Content,
  SearchInfo,
  WindowContainer,
  LoaderContainer,
  AssetOption,
  AssetOptionsContainer,
  AssetOptionsIcon,
  MoreDetailsButton,
} from './MainElements';

import Sidebar from '../Sidebar/Sidebar';
import { Colors } from '../Global/Colors';

const AppWrapper = (props) => {
  return (
    <>
      <ThemeProvider theme={Colors}>
        <WindowContainer>
          <Sidebar />
          <Main {...props} />
        </WindowContainer>
      </ThemeProvider>
    </>
  );
};

const Main = (props) => {
  const { isInitial, isLoading, isDetailed, searchResults } = props;
  return (
    <MainSideContainer>
      <Switch>
        <Route exact path="/">
          <InitialState isInitial={isInitial} />
          <ResultState {...props} />
          <LoadingState isInitial={isInitial} isLoading={isLoading} />
        </Route>
        <Route path="/assets/:id">
          <DetailedViewState isDetailed={isDetailed} searchResults={searchResults} />
        </Route>
      </Switch>
    </MainSideContainer>
  );
};

const AssetOptionsButton = forwardRef((props, ref) => {
  return (
    <>
      <HeaderHamburger ref={ref} onClick={(e) => e.stopPropagation()}>
        <GiHamburgerMenu />
      </HeaderHamburger>
    </>
  );
});

const AssetOptionsMenu = () => {
  return (
    <>
      <AssetOptionsContainer onClick={(e) => e.stopPropagation()}>
        <AssetOption>
          <AssetOptionsIcon>
            <AiOutlineEdit />
          </AssetOptionsIcon>
          Edit
        </AssetOption>
        <AssetOption>
          <AssetOptionsIcon>
            <AiOutlineStar />
          </AssetOptionsIcon>
          Favourite
        </AssetOption>
        <AssetOption>
          <AssetOptionsIcon>
            <AiOutlineDelete />
          </AssetOptionsIcon>
          Delete
        </AssetOption>
      </AssetOptionsContainer>
    </>
  );
};

const DataHeader = ({ data }) => {
  return (
    <>
      <CustomHeader>
        <HeaderOwnerIcon />
        <HeaderOwnerInfo>
          {/* {data.id}/{data.name} */}
          Ownername/{data.name}
        </HeaderOwnerInfo>
        <HeaderUploadDate>Upload date: {data.updatedAt}</HeaderUploadDate>
        <HeaderSpacing />
        <Tippy trigger="click" interactive="true" render={(attrs) => <AssetOptionsMenu {...attrs} />}>
          <AssetOptionsButton />
        </Tippy>
        <HeaderArrow />
      </CustomHeader>
    </>
  );
};

const DataDetails = ({ data, ...props }) => {
  return (
    <DetailsContainer>
      <DetailsRow>
        <DetailsTitle>Description</DetailsTitle>
        <DetailsText>{data.description}</DetailsText>
      </DetailsRow>
      <DetailsRow>
        <DetailsTitle>URL</DetailsTitle>
        <DetailsText>{data.location.parameters[0].value}</DetailsText>
      </DetailsRow>
      <DetailsRow>
        <DetailsTitle>Tags</DetailsTitle>
        <DetailsText>{data.tags.join(', ')}</DetailsText>
      </DetailsRow>
      <DetailsRow>
        <DetailsTitle>
          <MoreDetailsButton to={`/assets/${data.id}`}>More details</MoreDetailsButton>
        </DetailsTitle>
      </DetailsRow>
    </DetailsContainer>
  );
};

const RenderResults = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const { searchResults } = props;

  if (Object.keys(searchResults).length && searchResults.length) {
    return (
      <>
        {searchResults.map((result) => {
          return (
            <Collapsible
              key={result.id}
              trigger={<DataHeader setShowOptions={setShowOptions} showOptions={showOptions} data={result} />}
            >
              <DataDetails {...props} data={result} />
            </Collapsible>
          );
        })}
      </>
    );
  }

  return <div>No results :(</div>;
};

const ResultState = (props) => {
  const { isInitial, isLoading, searchResults, isDetailed } = props;
  if (!isInitial && !isLoading && !isDetailed) {
    return (
      <>
        <SearchInfo>
          Results for &apos;{localStorage.getItem('searchTerm')}&apos; ({searchResults.length} results)
        </SearchInfo>
        <Content>{RenderResults(props)}</Content>
      </>
    );
  }
  return null;
};

const InitialState = ({ isInitial }) => {
  if (isInitial) {
    return (
      <>
        <SearchInfo>Search for data to see results!</SearchInfo>
      </>
    );
  }
  return null;
};

const LoadingState = ({ isInitial, isLoading }) => {
  if (!isInitial && isLoading) {
    return (
      <>
        <LoaderContainer>
          <Loader type="Grid" color="#00BFFF" height={200} width={200} />
        </LoaderContainer>
      </>
    );
  }
  return null;
};

const DetailedViewState = ({ isDetailed, searchResults }) => {
  return (
    <>
      <AssetDetailedView searchResults={searchResults} />
    </>
  );
};

export default AppWrapper;

import React from 'react';
import { ThemeProvider } from 'styled-components';
import Collapsible from 'react-collapsible';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
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
} from './MainElements';

import Sidebar from '../Sidebar/Sidebar';
import { Colors } from '../Global/Colors';

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
        <HeaderSize>Size: {data.size} MB</HeaderSize>
        <HeaderSpacing />
        <HeaderHamburger />
        <HeaderArrow />
      </CustomHeader>
    </>
  );
};

const DataDetails = ({ data }) => {
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
    </DetailsContainer>
  );
};

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

const RenderResults = (results) => {
  if (Object.keys(results).length && results.length) {
    return (
      <>
        {results.map((result) => {
          return (
            <Collapsible key={result.id} trigger={<DataHeader data={result} />}>
              <DataDetails data={result} />
            </Collapsible>
          );
        })}
      </>
    );
  }

  return <div>No results :(</div>;
};

const Main = (props) => {
  const { isInitial, isLoading, searchResults } = props;

  return (
    <MainSideContainer>
      {isInitial && (
        <>
          <SearchInfo>Search for data to see results!</SearchInfo>
        </>
      )}

      {!isInitial && !isLoading && (
        <>
          <SearchInfo>
            Results for &apos;{localStorage.getItem('searchTerm')}&apos; ({searchResults.length} results)
          </SearchInfo>
          <Content>{RenderResults(searchResults)}</Content>
        </>
      )}

      {!isInitial && isLoading && (
        <>
          <LoaderContainer>
            <Loader type="Grid" color="#00BFFF" height={200} width={200} />
          </LoaderContainer>
        </>
      )}
    </MainSideContainer>
  );
};

export default AppWrapper;

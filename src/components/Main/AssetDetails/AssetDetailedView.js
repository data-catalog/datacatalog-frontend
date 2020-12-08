import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Loader from 'react-loader-spinner';
import { Colors } from '../../Global/Colors';
import AssetApi from '../../../apis/AssetApi';
import { LoaderContainer } from '../MainElements';
import {
  TabContainer,
  SingleTab,
  AllTabs,
  TabPanelContainer,
  DescriptionContainer,
  GeneralDataContainer,
  DetailedViewHeader,
  AssetTitle,
  Button,
  ButtonContainer,
  LeftTableContainer,
  RightTableContainer,
} from './AssetDetailedViewElements';

const GeneralData = (props) => {
  return (
    <>
      <GeneralDataContainer>
        <LeftTableContainer>SSSSSSSSSSSSSUP</LeftTableContainer>
        <RightTableContainer>SUPPP ON RIGHT</RightTableContainer>
      </GeneralDataContainer>
    </>
  );
};

const DescriptionData = (props) => {
  const { data } = props;
  return (
    <>
      <DescriptionContainer>{data.description}</DescriptionContainer>
    </>
  );
};

const DetailedViewWrapper = (props) => {
  const { data } = props;
  return (
    <>
      <DetailedViewHeader>
        <AssetTitle>OwnerName/{data.name}</AssetTitle>
        <ButtonContainer>
          <Button>Save</Button>
          <Button>Delete</Button>
          <Button>Favorite</Button>
        </ButtonContainer>
      </DetailedViewHeader>

      <TabContainer selectedTabPanelClassName="is-selected" selectedTabClassName="is-selected">
        <AllTabs>
          <SingleTab>General</SingleTab>
          <SingleTab>Description</SingleTab>
        </AllTabs>

        <TabPanelContainer>
          <GeneralData {...props} />
        </TabPanelContainer>
        <TabPanelContainer>
          <DescriptionData {...props} />
        </TabPanelContainer>
      </TabContainer>
    </>
  );
};

const AssetDetailedView = (props) => {
  const { id } = useParams();

  const [oneAsset, setOneAsset] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // props.setIsLoading(true);
      const assetPath = `assets/${id}`;
      const results = (await AssetApi.get(assetPath)).data;
      setOneAsset(results);
      // props.setSearchResults(results);
      // props.setIsLoading(false);
      // props.setIsDetailed(true);
    }
    fetchData();
  }, [id]);

  return (
    <>
      <ThemeProvider theme={Colors}>
        {oneAsset ? (
          <DetailedViewWrapper data={oneAsset} />
        ) : (
          <LoaderContainer>
            <Loader type="Grid" color="#00BFFF" height={200} width={200} />
          </LoaderContainer>
        )}
      </ThemeProvider>
    </>
  );
};

export default AssetDetailedView;

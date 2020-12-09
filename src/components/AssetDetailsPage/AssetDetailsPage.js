import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AssetApi from '../../apis/AssetApi';
import MainLoader from '../MainLoader';
import Page from '../Page';
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
} from './AssetDetailsPageElements';

const GeneralData = ({ asset }) => {
  return (
    <GeneralDataContainer>
      <LeftTableContainer>SSSSSSSSSSSSSUP {asset.name}</LeftTableContainer>
      <RightTableContainer>SUPPP ON RIGHT</RightTableContainer>
    </GeneralDataContainer>
  );
};

const DescriptionData = ({ asset }) => {
  return <DescriptionContainer>{asset.description}</DescriptionContainer>;
};

const DetailedViewWrapper = ({ asset }) => {
  return (
    <>
      <DetailedViewHeader>
        <AssetTitle>OwnerName/{asset.name}</AssetTitle>
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
          <GeneralData asset={asset} />
        </TabPanelContainer>

        <TabPanelContainer>
          <DescriptionData asset={asset} />
        </TabPanelContainer>
      </TabContainer>
    </>
  );
};

const AssetDetailsPage = () => {
  const { id } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const results = (await AssetApi.get(`assets/${id}`)).data;

      setAsset(results);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  return (
    <Page>
      {isLoading && <MainLoader />}

      {asset && <DetailedViewWrapper asset={asset} />}
    </Page>
  );
};

export default AssetDetailsPage;

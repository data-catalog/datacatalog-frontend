import React, { useState, useEffect, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineEdit, AiOutlineStar, AiOutlineDelete } from 'react-icons/ai';
import Tippy from '@tippyjs/react/headless';
import Collapsible from 'react-collapsible';
import AssetApi from '../../apis/AssetApi';
import MainLoader from '../MainLoader';
import Page from '../Page';

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
  SearchInfo,
  AssetOption,
  AssetOptionsContainer,
  AssetOptionsIcon,
  MoreDetailsButton,
} from './AssetsPageElements';

const Content = styled.div`
  overflow: auto;
`;

const DataDetails = ({ asset }) => {
  return (
    <DetailsContainer>
      <DetailsRow>
        <DetailsTitle>Description</DetailsTitle>
        <DetailsText>{asset.description}</DetailsText>
      </DetailsRow>
      <DetailsRow>
        <DetailsTitle>URL</DetailsTitle>
        <DetailsText>{asset.location.parameters[0].value}</DetailsText>
      </DetailsRow>
      <DetailsRow>
        <DetailsTitle>Tags</DetailsTitle>
        <DetailsText>{asset.tags.join(', ')}</DetailsText>
      </DetailsRow>
      <DetailsRow>
        <DetailsTitle>
          <MoreDetailsButton to={`/assets/${asset.id}`}>More details</MoreDetailsButton>
        </DetailsTitle>
      </DetailsRow>
    </DetailsContainer>
  );
};

const DataHeader = ({ asset }) => {
  return (
    <>
      <CustomHeader>
        <HeaderOwnerIcon />
        <HeaderOwnerInfo>
          {asset.ownerId}/{asset.name}
        </HeaderOwnerInfo>
        <HeaderUploadDate>Upload date: {asset.updatedAt}</HeaderUploadDate>
        <HeaderSpacing />
        <Tippy trigger="click" interactive="true" render={(attrs) => <AssetOptionsMenu {...attrs} />}>
          <AssetOptionsButton />
        </Tippy>
        <HeaderArrow />
      </CustomHeader>
    </>
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

const AssetsPage = () => {
  const { searchTerm } = useParams();
  const keyword = searchTerm?.trim();

  const [isLoading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const path = keyword ? `/assets/search/${keyword}?` : '/assets';
      // const owner = localStorage.getItem('ownerFilter');

      // path += `owner=${owner}`;

      const results = (await AssetApi.get(path)).data;

      setAssets(results);
      setLoading(false);
    }

    fetchData();
  }, [keyword]);

  return (
    <Page>
      {isLoading && <MainLoader />}

      {!!assets.length && (
        <SearchInfo>
          Results for &apos;{keyword}&apos; ({assets.length} results)
        </SearchInfo>
      )}

      {!isLoading && !assets.length && <SearchInfo>No results for &apos;{keyword}&apos;</SearchInfo>}

      <Content>
        {assets.map((asset) => {
          console.log(assets);
          return (
            <Collapsible key={asset.id} trigger={<DataHeader asset={asset} />}>
              <DataDetails asset={asset} />
            </Collapsible>
          );
        })}
      </Content>
    </Page>
  );
};

export default AssetsPage;

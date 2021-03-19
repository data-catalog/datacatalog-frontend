import React, { useState, useEffect, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineEdit, AiOutlineStar, AiOutlineDelete } from 'react-icons/ai';
import Tippy from '@tippyjs/react/headless';
import Collapsible from 'react-collapsible';
import AssetApi from '../../apis/AssetApi';
import MainLoader from '../../components/MainLoader';

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

const AssetDetails = ({ asset }) => {
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

const AssetHeader = ({ asset }) => {
  return (
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
  );
};

const AssetOptionsButton = forwardRef((props, ref) => {
  return (
    <HeaderHamburger ref={ref} onClick={(e) => e.stopPropagation()}>
      <GiHamburgerMenu />
    </HeaderHamburger>
  );
});

const AssetOptionsMenu = () => {
  return (
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
  );
};

const AssetRow = ({ asset }) => (
  <Collapsible trigger={<AssetHeader asset={asset} />}>
    <AssetDetails asset={asset} />
  </Collapsible>
);

const AssetsPage = () => {
  const { searchTerm } = useParams();
  const keyword = searchTerm?.trim();

  const [isLoading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const path = keyword ? `/assets/search/${keyword}?` : '/assets';

      const results = (await AssetApi.get(path)).data;

      setAssets(results);
      setLoading(false);
    }

    fetchData();
  }, [keyword]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <>
      <SearchInfo>
        {assets.length === 0 ? `No results for '${keyword}'.` : `Results for '${keyword}' ({assets.length} results)`}
      </SearchInfo>

      <Content>
        {assets.map((asset) => (
          <AssetRow key={asset.id} asset={asset} />
        ))}
      </Content>
    </>
  );
};

export default AssetsPage;

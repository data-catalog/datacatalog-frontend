import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import AssetApi from '../../apis/AssetApi';

const SearchButtonContainer = styled.button`
  flex: 0 1 10%;
  border: 1px solid white;
  border-radius: 0px;
  background: #00b4cc;
  padding-top: 1px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
`;

const SearchButton = (props) => {
  const doSearch = async () => {
    props.setIsLoading(true);
    const results = (await AssetApi.get('assets')).data;
    props.setSearchResults(results);
    props.setIsLoading(false);
  };

  return (
    <>
      <SearchButtonContainer onClick={doSearch}>
        <FaSearch />
      </SearchButtonContainer>
    </>
  );
};

export default SearchButton;

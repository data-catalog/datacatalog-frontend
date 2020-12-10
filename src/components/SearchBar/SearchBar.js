import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Search, SearchTerm, Wrapper } from './SearchbarElements';
import Filter from './FilterModal/Filter';

const SearchLink = styled(Link)`
  flex: 0 1 10%;
  border: 1px solid white;
  border-radius: 0px;
  background: #00b4cc;
  padding-top: 1px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
`;

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Wrapper>
      <Search>
        <SearchTerm
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for data..."
        />
        <SearchLink to={`/assets/search/${searchTerm}`}>
          <FaSearch />
        </SearchLink>
        <Filter />
      </Search>
    </Wrapper>
  );
};

export default Searchbar;

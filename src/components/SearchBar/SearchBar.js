import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Search, SearchButton, SearchTerm, Wrapper } from './SearchbarElements';
import Filter from './FilterModal/Filter';

const Searchbar = () => {
  return (
    <Wrapper>
      <Search>
        <SearchTerm placeholder="Search for data.." />
        <SearchButton>
          <FaSearch />
        </SearchButton>
        <Filter />
      </Search>
    </Wrapper>
  );
};

export default Searchbar;

import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Search, SearchButton, SearchTerm, Wrapper } from './SearchbarElements';
import Filter from './FilterModal/Filter';

const Searchbar = (props) => {
  return (
    <Wrapper>
      <Search>
        <SearchTerm placeholder="Search for data.." />
        <SearchButton>
          <FaSearch />
        </SearchButton>
        <Filter {...props} />
      </Search>
    </Wrapper>
  );
};

export default Searchbar;

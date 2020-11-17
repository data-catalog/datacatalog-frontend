import React, { useState } from 'react';
import { Search, SearchTerm, Wrapper } from './SearchbarElements';
import Filter from './FilterModal/Filter';
import SearchButton from './SearchButton';

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm'));

  return (
    <Wrapper>
      <Search>
        <SearchTerm
          value={searchTerm || ''}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            localStorage.setItem('searchTerm', event.target.value);
          }}
          placeholder="Search for data.."
        />
        <SearchButton {...props} />
        <Filter />
      </Search>
    </Wrapper>
  );
};

export default Searchbar;

import React from 'react'
import { Search, SearchButton, SearchTerm, Wrapper } from './SearchbarElements'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
  return (
    <Wrapper>
      <Search>
        <SearchTerm placeholder="Search for data.."/>
        <SearchButton>
          <FaSearch/>
        </SearchButton>
      </Search>
    </Wrapper>     
  )
}

export default SearchBar

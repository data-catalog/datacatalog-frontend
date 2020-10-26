import React from 'react'
import { Search, SearchButton, SearchTerm, Wrapper } from './SearchbarElements'
import { FaSearch } from 'react-icons/fa'
import Filter from './FilterModal/Filter'

const Searchbar = (props) => {
  return (
    <Wrapper>
      <Search>
        <SearchTerm placeholder="Search for data.."/>
        <SearchButton>
          <FaSearch/>
        </SearchButton>
        <Filter {...props}/>
      </Search>
    </Wrapper>     
  )
}

export default Searchbar

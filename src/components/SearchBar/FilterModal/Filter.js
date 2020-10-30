import React from 'react'
import styled from 'styled-components'
import { FaFilter } from 'react-icons/fa'

const FilterButton = styled.button`
  width: 40px;
  height: 36px;
  border: 1px solid #00B4CC;
  background: #00B4CC;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`

const Filter = (props) => {

  return (
    <>
      <FilterButton onClick={props.openModal}>
        <FaFilter />
      </FilterButton>
    </>
  );
}

export default Filter

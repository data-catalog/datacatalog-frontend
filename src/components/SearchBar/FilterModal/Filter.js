import React from 'react';
import styled from 'styled-components';
import { FaFilter } from 'react-icons/fa';

const FilterButton = styled.button`
  width: 40px;
  height: 36px;
  border: 1px solid #00b4cc;
  background: #00b4cc;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

const Filter = ({ openModal }) => {
  return (
    <>
      <FilterButton onClick={openModal}>
        <FaFilter />
      </FilterButton>
    </>
  );
};

export default Filter;

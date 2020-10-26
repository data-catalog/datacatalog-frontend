import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 50%;
  position: relative;
`;

export const Search = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`

export const SearchTerm = styled.input`
  width: 100%;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #000000;
`

export const SearchButton = styled.button`
  width: 40px;
  height: 36px;
  border: 1px solid #00B4CC;
  background: #00B4CC;
  text-align: center;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
`
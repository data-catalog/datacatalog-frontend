import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 60%;
  position: relative;
  transform: translateX(36%);
`;

export const Search = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

export const SearchTerm = styled.input`
  flex: 0 1 80%;
  border: 1px solid white;
  background-color: #00b4cc;
  border-right: none;
  padding: 5px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: white;
`;

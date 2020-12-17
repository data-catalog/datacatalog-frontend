import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  transform: translateY(70%);
`;

const MainLoader = () => (
  <LoaderContainer>
    <Loader type="Grid" color="#00BFFF" height={200} width={200} />
  </LoaderContainer>
);

export default MainLoader;

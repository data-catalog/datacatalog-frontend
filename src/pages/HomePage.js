import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { styled } from 'redoc';
import Page from '../components/Page';

const Wrapper = styled.div`
  min-height: calc(100vh - 56px);
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`;

const Title = styled(Jumbotron)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('/bg.jpg');
  margin: 0;
  border-radius: 0;
  text-align: center;
  flex-grow: 1;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 80rem;
  margin: auto;
  margin-bottom: 4rem;
  justify-content: space-around;
  flex-grow: 0;
`;

const Item = styled.div`
  flex: 1 0 12rem;
  margin: 4rem;
  text-align: center;
`;

const Keyline = styled.h3`
  margin-bottom: 2rem;
  white-space: nowrap;
`;

const HomePage = () => {
  return (
    <Page variant="landing">
      <Wrapper>
        <Title>
          <h1 className="display-4">Welcome to Data Catalog!</h1>

          <p className="lead">
            Looking for the right way to magnage data? We will help you create and manage your datasets, and also find
            new ones.
          </p>
          <p>
            <Link to="/assets/search">
              <Button size="lg">Explore assets</Button>
            </Link>
          </p>
        </Title>
        <ItemContainer>
          <Item>
            <Keyline>Data Accessibility</Keyline>
            <p>
              Access your datasets from one place, no matter where is it stored. The Data Catalog is an all-in platform
              to display data from a wide range of sources, including URL and Azure Blob Storage.
            </p>
          </Item>
          <Item>
            <Keyline>Pretty to look at</Keyline>
            <p>
              View your datasets in a clear-cut display! This application is made for humans, so we want yout to be able
              to look at your data and find what you are looking for without blinking! With Data Catalog it&apos;s easy
              to browse datasets.
            </p>
          </Item>
          <Item>
            <Keyline>Python Library</Keyline>
            <p>
              Easily access your datasets managed in the Data Catalog application with our Python library. It provides
              methods to download your data directly into a Pandas DataFrame.
            </p>
          </Item>
        </ItemContainer>
      </Wrapper>
    </Page>
  );
};

export default HomePage;

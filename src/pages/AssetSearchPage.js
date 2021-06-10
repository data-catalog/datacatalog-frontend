import React from 'react';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import { MdSearch } from 'react-icons/md';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useSWR from 'swr';
import AssetApi from '../apis/AssetApi';
import AssetCard from '../components/AssetCard';
import CardContainer from '../components/CardContainer';
import Page from '../components/Page';

const fetcher = (url) => AssetApi.get(url);

const SearchIcon = styled(InputGroup.Text)`
  background: none;
  border: none;
  margin-left: -3.5rem;
  z-index: 1;
`;

export default function AssetSearchPage() {
  const history = useHistory();
  const { searchTerm } = useParams();
  const { data } = useSWR(searchTerm ? `/assets/search/${searchTerm}` : '/assets', fetcher);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/assets/search/${e.target.searchTerm.value}`);
    e.target.reset();
  };

  return (
    <Page>
      <h1 className="mb-3">Explore assets</h1>
      <Form onSubmit={handleSearch}>
        <InputGroup size="lg" className="mb-5 rounded-pill shadow-sm">
          <FormControl
            className="rounded-pill"
            name="searchTerm"
            placeholder="Search assets..."
            aria-label="Search assets"
          />
          <InputGroup.Append className="">
            <SearchIcon>
              <MdSearch />
            </SearchIcon>
          </InputGroup.Append>
        </InputGroup>
        <h2 className="mb-4">{searchTerm ? `Search results for ${searchTerm}` : 'Recently added'}</h2>
        <CardContainer>{data && data.data.map((asset) => <AssetCard key={asset.id} asset={asset} />)}</CardContainer>
      </Form>
    </Page>
  );
}

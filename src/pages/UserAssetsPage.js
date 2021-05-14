import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import CardContainer from '../components/CardContainer';
import AssetApi from '../apis/AssetApi';
import AssetCard from '../components/AssetCard';
import useUser from '../hooks/useUser';
import Page from '../components/Page';

const fetcher = (url) => AssetApi.get(url);

export default function AssetSearchPage() {
  const user = useUser();
  const { data } = useSWR('/user/assets', fetcher);

  const ownedAssets = data?.data.filter((asset) => asset.ownerId === user.userId);
  const memberAssets = data?.data.filter((asset) => asset.members.includes(user.userId));

  return (
    <Page>
      <h1 className="mb-3">Your assets</h1>

      <h2 className="mb-4">Assets owned by you</h2>
      <CardContainer>{data && ownedAssets.map((asset) => <AssetCard key={asset.id} asset={asset} />)}</CardContainer>
      {ownedAssets?.length === 0 && (
        <div className="text-muted">
          You don&apos;t own any assets. If you want to create one, click <Link to="/assets/create">here</Link>.
        </div>
      )}

      <h2 className="mb-4 mt-5">Assets that you are a member of</h2>
      <CardContainer>{data && memberAssets.map((asset) => <AssetCard key={asset.id} asset={asset} />)}</CardContainer>
      {memberAssets?.length === 0 && <div className="text-muted">You are not a member of any assets.</div>}
    </Page>
  );
}

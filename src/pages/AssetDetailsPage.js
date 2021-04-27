import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import useSWR, { mutate, trigger } from 'swr';
import { Button, Card, Tabs, Tab } from 'react-bootstrap';

import AssetApi from '../apis/AssetApi';
import UserApi from '../apis/UserApi';
import useUser from '../hooks/useUser';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import ThreeSpinner from '../components/ThreeSpinner';
import AssetOverviewTab from '../components/AssetOverviewTab';
import AssetMembersTab from '../components/AssetMembersTab';
import { NotFoundPage, UnauthorizedPage } from './ErrorPage';
import AssetSourceTab from '../components/AssetSourceTab';
import AssetUsageTab from '../components/AssetUsageTab';
import Page from '../components/Page';

const assetFetcher = (url) => AssetApi.get(url);

// eslint-disable-next-line max-lines-per-function
export default function AssetDetailsPage() {
  const history = useHistory();
  const { assetId } = useParams();
  const user = useUser();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { data, error } = useSWR(`/assets/${assetId}`, assetFetcher);
  const asset = data?.data;

  const canEdit = user?.userId === asset?.ownerId || asset?.members.includes(user?.userId) || user?.role === 'ADMIN';

  const handleDelete = async () => {
    try {
      await AssetApi.delete(`/assets/${asset.id}`);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveMember = async (userId) => {
    const newMembers = asset.members.filter((id) => id !== userId);

    mutate(`/assets/${asset.id}`, { data: { ...asset, members: newMembers } }, false);
    await AssetApi.patch(`/assets/${asset.id}`, { members: newMembers });

    trigger(`/assets/${asset.id}`);
  };

  const handleAddMember = async (username) => {
    const response = await UserApi.get(`/users/username/${username}`);
    const userId = response.data.id;

    if (asset.ownerId !== userId && !asset.members.includes(userId)) {
      await AssetApi.patch(`/assets/${asset.id}`, { members: [...asset.members, userId] });
      mutate(`/assets/${asset.id}`);
    }
  };

  if ([401, 403].includes(error?.response.status)) {
    return <UnauthorizedPage />;
  }

  if (error?.response.status === 404) {
    return <NotFoundPage />;
  }

  if (!asset) {
    return <ThreeSpinner size="lg" />;
  }

  return (
    <Page>
      <Card className="shadow-sm">
        <Card.Header as="h1">{asset.name}</Card.Header>
        <Card.Body>
          {canEdit && (
            <div className="mb-4 d-flex justify-content-end">
              <Button
                as={Link}
                to={`/assets/${assetId}/edit`}
                variant="primary"
                className="flex-grow-0 mr-2 d-flex align-items-center"
              >
                <MdEdit className="mr-1" />
                Edit
              </Button>
              <Button
                variant="danger"
                className="flex-grow-0 d-flex align-items-center"
                onClick={() => setShowDeleteConfirmation(true)}
              >
                <MdDelete className="mr-1" />
                Delete
              </Button>
            </div>
          )}

          <DeleteConfirmationModal
            show={showDeleteConfirmation}
            onHide={() => setShowDeleteConfirmation(false)}
            onDelete={handleDelete}
          >
            Do you really want to delete the {asset.name} asset?
          </DeleteConfirmationModal>

          <Tabs defaultActiveKey="overview" className="mb-3 border-bottom" transition={false}>
            <Tab eventKey="overview" title="Overview">
              <AssetOverviewTab asset={asset} />
            </Tab>
            <Tab eventKey="source" title="Source &amp; Versions">
              <AssetSourceTab asset={asset} />
            </Tab>
            <Tab eventKey="access" title="Manage Access">
              <AssetMembersTab
                ownerId={asset.ownerId}
                members={asset.members}
                onRemoveMember={handleRemoveMember}
                onAddMember={handleAddMember}
              />
            </Tab>
            <Tab eventKey="usage" title="Usage">
              <AssetUsageTab asset={asset} />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Page>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import EasyEdit, { Types } from 'react-easy-edit';
import AssetApi from '../../apis/AssetApi';
import MainLoader from '../MainLoader';
import Page from '../Page';
import {
  TabContainer,
  SingleTab,
  AllTabs,
  TabPanelContainer,
  DescriptionContainer,
  GeneralDataContainer,
  DetailedViewHeader,
  AssetTitle,
  Button,
  ButtonContainer,
  LeftTableContainer,
  RightTableContainer,
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  CustomInputDiv,
  Input,
} from './AssetDetailsPageElements';

const CustomInput = (props) => {
  const { value, setParentValue } = props;
  return (
    <CustomInputDiv>
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          setParentValue(e.target.value);
        }}
      />
    </CustomInputDiv>
  );
};

const EditableComponent = ({ setter, dataValue }) => {
  return (
    <EasyEdit
      type={Types.TEXT}
      // onSave={save}   save to localStorage
      onSave={(val) => setter({ type: `${val}` })}
      editComponent={<CustomInput />}
      saveButtonLabel={<BsCheck />}
      cancelButtonLabel={<ImCancelCircle />}
      value={dataValue}
    />
  );
};

const GeneralData = (props) => {
  const { asset, setNewAsset } = props;
  return (
    <GeneralDataContainer>
      <LeftTableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Type:</TableHeader>
              <TableCell>
                <EditableComponent setter={setNewAsset} dataValue={asset.location.type} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>Created at:</TableHeader>
              <TableCell>{asset.createdAt}</TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>Last Updated at:</TableHeader>
              <TableCell>{asset.updatedAt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </LeftTableContainer>
      <RightTableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Format:</TableHeader>
              <TableCell>
                <EditableComponent dataValue={asset.format} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>Tags:</TableHeader>
              <TableCell>
                <EditableComponent dataValue={asset.tags.join(', ')} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>Namespace:</TableHeader>
              <TableCell>
                <EditableComponent dataValue={asset.namespace} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </RightTableContainer>
    </GeneralDataContainer>
  );
};

const DescriptionData = ({ asset }) => {
  return <DescriptionContainer>{asset?.description || <em>(No description)</em>}</DescriptionContainer>;
};

const DetailedViewWrapper = ({ asset }) => {
  const [newAsset, setNewAsset] = useState({
    type: '',
    format: '',
    tags: '',
    namespace: '',
    description: '',
  });

  return (
    <>
      <DetailedViewHeader>
        <AssetTitle>OwnerName/{asset.name}</AssetTitle>
        <ButtonContainer>
          <Button>Save</Button>
          <Button>Delete</Button>
          <Button>Favorite</Button>
        </ButtonContainer>
      </DetailedViewHeader>

      <TabContainer selectedTabPanelClassName="is-selected" selectedTabClassName="is-selected">
        <AllTabs>
          <SingleTab>General</SingleTab>
          <SingleTab>Description</SingleTab>
        </AllTabs>

        <TabPanelContainer>
          <GeneralData newAsset={newAsset} setNewAsset={setNewAsset} asset={asset} />
        </TabPanelContainer>

        <TabPanelContainer>
          <DescriptionData asset={asset} />
        </TabPanelContainer>
      </TabContainer>
    </>
  );
};

const AssetDetailsPage = () => {
  const { id } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const results = (await AssetApi.get(`assets/${id}`)).data;

      setAsset(results);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  return (
    <Page>
      {isLoading && <MainLoader />}

      {asset && <DetailedViewWrapper asset={asset} />}
    </Page>
  );
};

export default AssetDetailsPage;
export { DetailedViewWrapper, DescriptionData, GeneralData };

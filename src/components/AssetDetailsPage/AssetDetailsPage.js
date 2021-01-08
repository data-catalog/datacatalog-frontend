import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import EasyEdit, { Types } from 'react-easy-edit';
import { ThemeProvider } from 'styled-components';
import Tippy from '@tippyjs/react/headless';
import AssetApi from '../../apis/AssetApi';
import MainLoader from '../MainLoader';
import Page from '../Page';
import { Colors } from '../Global/Colors';
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
  ModalContainer,
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

const EditableComponent = ({ newAsset, type, setter, dataValue }) => {
  return (
    <EasyEdit
      type={Types.TEXT}
      onSave={(val) => {
        const modifiedAsset = newAsset;
        modifiedAsset[type] = val;
        setter(modifiedAsset);
      }}
      editComponent={<CustomInput />}
      saveButtonLabel={<BsCheck />}
      cancelButtonLabel={<ImCancelCircle />}
      value={dataValue}
    />
  );
};

const GeneralData = (props) => {
  const { asset, setNewAsset, newAsset } = props;
  return (
    <GeneralDataContainer>
      <LeftTableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableHeader>Type:</TableHeader>
              <TableCell>
                <EditableComponent
                  newAsset={newAsset}
                  type="type"
                  setter={setNewAsset}
                  dataValue={asset.location.type}
                />
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
                <EditableComponent newAsset={newAsset} type="format" setter={setNewAsset} dataValue={asset.format} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>Tags:</TableHeader>
              <TableCell>
                <EditableComponent
                  newAsset={newAsset}
                  type="tags"
                  setter={setNewAsset}
                  dataValue={asset.tags.join(', ')}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHeader>Namespace:</TableHeader>
              <TableCell>
                <EditableComponent
                  newAsset={newAsset}
                  type="namespace"
                  setter={setNewAsset}
                  dataValue={asset.namespace}
                />
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

const DeleteConfirmation = ({ id, setVisible }) => {
  const [deleted, setDeleted] = useState(false);
  const doDelete = async () => {
    try {
      await AssetApi.delete(`assets/${id}`).data;
      setDeleted(true);
    } catch (err) {
      if (err.response?.status === 405) {
        console.log('No auth.');
      } else {
        console.log(err);
      }
    }
  };

  return (
    <ThemeProvider theme={Colors}>
      {deleted && <Redirect to="/" />}
      <ModalContainer>
        <Button onClick={() => setVisible(false)}>No</Button>
        <Button
          onClick={() => {
            doDelete();
          }}
        >
          Yes
        </Button>
      </ModalContainer>
    </ThemeProvider>
  );
};

const DetailedViewWrapper = ({ asset }) => {
  const [newAsset, setNewAsset] = useState({});
  const [visible, setVisible] = useState(false);

  const sendPut = async (data) => {
    try {
      console.log(data);
      const result = await AssetApi.patch(`assets/${asset.id}`, data);
      // await AssetApi.patch(`assets/${asset.id}`, JSON.stringify(data));
      console.log(result);
    } catch (err) {
      if (err.response?.status === 405) {
        console.log('No auth.');
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      <DetailedViewHeader>
        <AssetTitle>
          {asset.ownerId}/{asset.name}
        </AssetTitle>
        <ButtonContainer>
          <Button onClick={() => sendPut(newAsset)}>Save</Button>
          <Tippy
            trigger="click"
            interactive="true"
            visible={visible}
            render={(attrs) => <DeleteConfirmation setVisible={setVisible} id={asset.id} {...attrs} />}
          >
            <Button
              onClick={() => {
                return visible ? setVisible(false) : setVisible(true);
              }}
            >
              Delete
            </Button>
          </Tippy>
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

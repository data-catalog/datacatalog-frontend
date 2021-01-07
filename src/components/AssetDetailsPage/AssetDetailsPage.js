import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import EasyEdit, { Types } from 'react-easy-edit';
import { ThemeProvider } from 'styled-components';
import { confirmAlert } from 'react-confirm-alert';
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
  return <DescriptionContainer>{asset.description}</DescriptionContainer>;
};

const DeleteConfirmation = ({ id, onc }) => {
  const doDelete = async () => {
    try {
      const response = await AssetApi.delete(`assets/${id}`).data;
      console.log(response);
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
      <ModalContainer>
        <Button onClick={() => onc()}>No</Button>
        <Button
          onClick={() => {
            doDelete();
            onc();
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

  const confirmDelete = ({ id }) => {
    confirmAlert({
      // closeOnEscape: true,
      // closeOnClickOutside: true,
      // customUI: ({ onClose }) => {
      //   return (
      //     <div className="custom-ui">
      //       <DeleteConfirmation id={id} onc={onClose} />
      //     </div>
      //   );
      // },
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes'),
        },
        {
          label: 'No',
          onClick: () => alert('Click No'),
        },
      ],
    });
  };

  return (
    <>
      <DetailedViewHeader>
        <AssetTitle>
          {asset.ownerId}/{asset.name}
        </AssetTitle>
        <ButtonContainer>
          <Button onClick={() => sendPut(newAsset)}>Save</Button>
          <Button onClick={() => confirmDelete(asset.id)}>Delete</Button>
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

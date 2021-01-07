import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import Page from '../Page';
import AssetApi from '../../apis/AssetApi';
import {
  CreateAssetHeader,
  CreateAssetTitle,
  ButtonContainer,
  Button,
  CreateAssetBody,
  StepTitle,
  StepInput,
  CreateAssetWrapperDiv,
  SelectOption,
  CreateAssetSelect,
} from './CreateAssetElements';
import { useAuth } from '../../context/AuthContext';

const NameStep = () => {
  return (
    <>
      <StepTitle>Enter asset name:</StepTitle>
      <StepInput
        onChange={(event) => {
          localStorage.setItem('createAssetName', event.target.value);
        }}
      />
    </>
  );
};

const ShortDescStep = () => {
  return (
    <>
      <StepTitle>Enter a short description:</StepTitle>
      <StepInput
        onChange={(event) => {
          localStorage.setItem('createAssetShortDescription', event.target.value);
        }}
      />
    </>
  );
};

const DescStep = () => {
  return (
    <>
      <StepTitle>Enter a description:</StepTitle>
      <StepInput
        onChange={(event) => {
          localStorage.setItem('createAssetDescription', event.target.value);
        }}
      />
    </>
  );
};

const TypeStep = () => {
  const [location, setLocation] = useState('url');

  return (
    <>
      <StepTitle>Select asset format:</StepTitle>
      <CreateAssetSelect
        onChange={(event) => {
          localStorage.setItem('createAssetFormat', event.target.value);
        }}
      >
        <SelectOption value="json">JSON</SelectOption>
        <SelectOption value="csv">CSV</SelectOption>
      </CreateAssetSelect>

      <StepTitle>Select asset location:</StepTitle>
      <CreateAssetSelect
        onChange={(event) => {
          setLocation(event.target.value);
          localStorage.setItem('createAssetLocation', event.target.value);
        }}
      >
        <SelectOption value="url">URL</SelectOption>
        <SelectOption value="azureblob">Azureblob</SelectOption>
      </CreateAssetSelect>

      {location === 'url' && (
        <>
          <StepTitle>URL</StepTitle>
          <StepInput
            onChange={(event) => {
              localStorage.setItem('createAssetUrl', event.target.value);
            }}
          />
        </>
      )}
      {location === 'azureblob' && (
        <>
          <StepTitle>Account URL</StepTitle>
          <StepInput
            onChange={(event) => {
              localStorage.setItem('createAssetAccountUrl', event.target.value);
            }}
          />
          <StepTitle>Container Name</StepTitle>
          <StepInput
            onChange={(event) => {
              localStorage.setItem('createAssetContainerName', event.target.value);
            }}
          />
          <StepTitle>Account Key</StepTitle>
          <StepInput
            onChange={(event) => {
              localStorage.setItem('createAssetAccountKey', event.target.value);
            }}
          />
          <StepTitle>SAS Token</StepTitle>
          <StepInput
            onChange={(event) => {
              localStorage.setItem('createAssetSasToken', event.target.value);
            }}
          />
        </>
      )}
    </>
  );
};

const NamespaceTagsStep = () => {
  return (
    <>
      <StepTitle>Enter the asset&apos;s namespace:</StepTitle>
      <StepInput
        onChange={(event) => {
          localStorage.setItem('createAssetNamespace', event.target.value);
        }}
      />

      <StepTitle>Enter the asset&apos;s tags (comma separated):</StepTitle>
      <StepInput
        onChange={(event) => {
          localStorage.setItem('createAssetTags', event.target.value);
        }}
      />
    </>
  );
};

const assembleAsset = (type) => {
  if (type === 'azureblob') {
    const asset = {
      name: localStorage.getItem('createAssetName'),
      description: localStorage.getItem('createAssetDescription'),
      location: {
        type: localStorage.getItem('createAssetLocation'),
        parameters: [
          {
            key: 'accountUrl',
            value: localStorage.getItem('createAssetAccountUrl'),
          },
          {
            key: 'containerName',
            value: localStorage.getItem('createAssetContainerName'),
          },
          {
            key: 'accountKey',
            value: localStorage.getItem('createAssetAccountKey'),
          },
          {
            key: 'sasToken',
            value: localStorage.getItem('createAssetSasToken'),
          },
        ],
      },
      tags: localStorage.getItem('createAssetTags').split(','),
      namespace: localStorage.getItem('createAssetNamespace'),
      format: localStorage.getItem('createAssetFormat'),
      shortDescription: localStorage.getItem('createAssetShortDescription'),
    };
    return JSON.stringify(asset);
  }

  const asset = {
    name: localStorage.getItem('createAssetName'),
    description: localStorage.getItem('createAssetDescription'),
    location: {
      type: localStorage.getItem('createAssetLocation'),
      parameters: [
        {
          key: 'url',
          value: localStorage.getItem('createAssetUrl'),
        },
      ],
    },
    tags: localStorage.getItem('createAssetTags').split(','),
    namespace: localStorage.getItem('createAssetNamespace'),
    format: localStorage.getItem('createAssetFormat'),
    shortDescription: localStorage.getItem('createAssetShortDescription'),
  };

  return JSON.stringify(asset);
};

const Nav = (props) => {
  const { currentStep } = props;
  const { user } = useAuth();

  async function createAsset() {
    const asset = assembleAsset(localStorage.getItem('createAssetLocation'));
    const results = (await AssetApi.post('assets/', asset)).data;

    console.log(results);
  }

  return (
    <>
      <ButtonContainer>
        {currentStep === 5 && (
          <Button
            onClick={() => {
              if (user) {
                createAsset();
              } else {
                console.log('Login!');
              }
            }}
          >
            Create Asset!
          </Button>
        )}
        <Button disabled={currentStep === 5} onClick={() => props.nextStep()}>
          Next Step
        </Button>
        <Button disabled={currentStep === 1} onClick={() => props.previousStep()}>
          Previous Step
        </Button>
      </ButtonContainer>
    </>
  );
};

const CreateAssetWrapper = () => {
  return (
    <>
      <CreateAssetWrapperDiv>
        <CreateAssetHeader>
          <CreateAssetTitle>Create a new asset</CreateAssetTitle>
        </CreateAssetHeader>
        <CreateAssetBody>
          <StepWizard nav={<Nav />}>
            <NameStep />
            <TypeStep />
            <ShortDescStep />
            <DescStep />
            <NamespaceTagsStep />
          </StepWizard>
        </CreateAssetBody>
      </CreateAssetWrapperDiv>
    </>
  );
};

const CreateAssetPage = () => {
  return (
    <Page>
      <CreateAssetWrapper />
    </Page>
  );
};

export default CreateAssetPage;

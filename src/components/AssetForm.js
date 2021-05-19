import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import RichEditor from './RichEditor';
import SubmitButton from './SubmitButton';
import TagsInput from './TagsInput';
import ToggleSwitch from './ToggleSwitch';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('The asset name is required.').max(256, 'The name must be maximum 256 characters long.'),
  isPublic: Yup.boolean().default(false),
  format: Yup.string().required('File format not selected.').oneOf(['csv', 'json'], 'Invalid file format.'),
  tags: Yup.array().of(Yup.string()),
  shortDescription: Yup.string().max(512, 'The short description must be maximum 512 characters long.').default(''),
  description: Yup.string().default(''),
  location: Yup.object().shape({
    type: Yup.string().required('Source type not selected.').oneOf(['url', 'azureblob'], 'Invalid source type.'),
    parameters: Yup.object().default({}),
  }),
});

function UrlFields({ register, errors }) {
  return (
    <Form.Group>
      <Form.Label>URL</Form.Label>
      <Form.Control
        type="text"
        name="location.parameters[url]"
        placeholder="Source URL"
        ref={register}
        isInvalid={!!errors?.location?.parameters?.url}
      />
      <Form.Control.Feedback type="invalid">{errors?.location?.parameters?.url.message}</Form.Control.Feedback>
    </Form.Group>
  );
}

function AzureBlobFields({ register, errors }) {
  return (
    <>
      <Form.Group>
        <Form.Label>Storage account URL</Form.Label>
        <Form.Control
          type="text"
          name="location.parameters[accountUrl]"
          placeholder="Storage Account URL"
          ref={register}
          isInvalid={!!errors?.location?.parameters?.accountUrl}
        />
        <Form.Control.Feedback type="invalid">{errors?.location?.parameters?.accountUrl.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Container name</Form.Label>
        <Form.Control
          type="text"
          name="location.parameters[containerName]"
          placeholder="Container name"
          ref={register}
          isInvalid={!!errors?.location?.parameters?.containerName}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.location?.parameters?.containerName.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Shared Access Signature (SAS token)</Form.Label>
        <Form.Control
          type="text"
          name="location.parameters[sasToken]"
          placeholder="SAS token"
          ref={register}
          isInvalid={!!errors?.location?.parameters?.sasToken}
        />
        <Form.Control.Feedback type="invalid">{errors?.location?.parameters?.sasToken.message}</Form.Control.Feedback>
        <Form.Text className="text-muted">Only required if the account key is not specified.</Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Account key</Form.Label>
        <Form.Control
          type="text"
          name="location.parameters[accountKey]"
          placeholder="Account key"
          ref={register}
          isInvalid={!!errors?.location?.parameters?.accountKey}
        />
        <Form.Control.Feedback type="invalid">{errors?.location?.parameters?.accountKey.message}</Form.Control.Feedback>
        <Form.Text className="text-muted">Only required if the SAS token is not specified.</Form.Text>
      </Form.Group>
    </>
  );
}

// eslint-disable-next-line max-lines-per-function
export default function AssetForm({ type, defaultValues, onSubmit, onCancel }) {
  const internalDefaultValues = useMemo(
    () =>
      defaultValues
        ? {
            ...defaultValues,
            location: {
              ...defaultValues.location,
              parameters: defaultValues.location.parameters.reduce(
                (acc, parameter) => ({ ...acc, [parameter.key]: parameter.value }),
                {}
              ),
            },
          }
        : null,
    [defaultValues]
  );

  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
    control,
    watch,
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues: internalDefaultValues });

  const locationType = watch('location.type');

  const internalOnSubmit = (data) => {
    return onSubmit({
      ...data,
      location: {
        ...data.location,
        parameters: Object.entries(data.location.parameters)
          .filter(([, value]) => value !== '')
          .map(([key, value]) => ({ key, value })),
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(internalOnSubmit)}>
      <Card.Title>General information</Card.Title>

      <Form.Group>
        <Form.Label>Asset name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Asset name" ref={register} isInvalid={!!errors.name} />
        <Form.Control.Feedback type="invalid">{errors?.name?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <ToggleSwitch name="isPublic" label="Public" innerRef={register} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Format</Form.Label>
        <Form.Control as="select" name="format" defaultValue ref={register} isInvalid={!!errors.format}>
          <option disabled value>
            Choose...
          </option>
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors?.format?.message}</Form.Control.Feedback>
        <Form.Text className="text-muted">The file format of the asset.</Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Tags</Form.Label>
        <TagsInput name="tags" placeholder="Enter tags..." control={control} isInvalid={!!errors.tags} />
        <Form.Control.Feedback type="invalid">{errors?.tags?.message}</Form.Control.Feedback>
        <Form.Text className="text-muted">
          Press <kbd>Enter</kbd> to add a tag.
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Short Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="shortDescription"
          placeholder="A brief description about the asset..."
          ref={register}
          isInvalid={!!errors.shortDescription}
        />
        <Form.Control.Feedback type="invalid">{errors?.shortDescription?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <RichEditor name="description" control={control} />
      </Form.Group>

      <Card.Title className="mt-5">Asset source</Card.Title>

      <Form.Group>
        <Form.Label>Source type</Form.Label>
        <Form.Control as="select" name="location.type" defaultValue ref={register} isInvalid={!!errors?.location?.type}>
          <option disabled value>
            Choose...
          </option>
          <option value="url">URL</option>
          <option value="azureblob">Azure Blob Storage</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors?.location?.type?.message}</Form.Control.Feedback>
      </Form.Group>

      {locationType && (
        <Card.Title as="h6" className="mt-4">
          Source parameters
        </Card.Title>
      )}

      {locationType === 'url' && <UrlFields register={register} errors={errors} />}
      {locationType === 'azureblob' && <AzureBlobFields register={register} errors={errors} />}

      <SubmitButton variant="success" className="mr-2" isSubmitting={isSubmitting}>
        {type === 'edit' ? 'Save' : 'Create'}
      </SubmitButton>

      {type === 'edit' && (
        <Button type="danger" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </Form>
  );
}

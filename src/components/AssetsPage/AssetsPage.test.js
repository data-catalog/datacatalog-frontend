import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import AssetsPage from './AssetsPage';
import { AuthProvider } from '../../context/AuthContext';
import MainLoader from '../MainLoader';
import AssetApi from '../../apis/AssetApi';
import { SearchInfo } from './AssetsPageElements';

const mockResponse = [
  {
    id: '5fa7dcfaea3ba3525bb641a6',
    createdAt: '2020-11-08T11:56:42.924Z',
    updatedAt: '2020-12-18T13:47:10.292Z',
    name: 'FlowersP',
    description: 'The UNPATCHED flowers are beautiful most of the time this year',
    location: {
      type: 'url',
      parameters: [
        {
          key: 'url',
          value: 'https://flowers.com',
        },
      ],
    },
    tags: ['tag1', 'tag2'],
    format: 'json',
    size: null,
    namespace: 'IRISS',
  },
  {
    id: '5fb3fa39a971ba272d288241',
    createdAt: '2020-11-17T16:28:41.788Z',
    updatedAt: '2020-11-17T16:28:41.788Z',
    name: 'Parametergeneration',
    description: 'Testing the automatic parameter extraction',
    location: {
      type: 'azureblob',
      parameters: [
        {
          key: 'accountUrl',
          value: 'https://datacatalogblob.blob.core.windows.net',
        },
        {
          key: 'containerName',
          value: 'container',
        },
        {
          key: 'sasToken',
          value:
            '‘?sp=rl&st=2020-11-16T17:10:50Z&se=2020-11-17T17:10:50Z&sv=2019-12-12&sr=c&sig=FHhqy%2Bgolwvh%2B2RmuTu4nLdrlS5B4zJrdVWrsipnJHU%3D',
        },
        {
          key: 'st',
          value: '2020-11-16T17:10:50Z',
        },
        {
          key: 'se',
          value: '2020-11-17T17:10:50Z',
        },
        {
          key: 'sp',
          value: 'rl',
        },
      ],
    },
    tags: ['test'],
    format: 'json',
    size: null,
    namespace: 'test',
  },
];

describe('AssetsPage', () => {
  it('shows loading indicator until data arrives', async () => {
    const mock = new MockAdapter(AssetApi);

    mock.onGet('/assets/search/term').reply(200, []);

    const wrapper = mount(
      <AuthProvider>
        <MemoryRouter initialEntries={['assets/search/term']}>
          <Route path="assets/search/:searchTerm">
            <AssetsPage />
          </Route>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(wrapper.find(MainLoader).length).toBe(1);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      wrapper.update();
    });

    expect(wrapper.find(MainLoader).length).toBe(0);
  });
});

describe('AssetsPage', () => {
  it('shows the number of results correctly', async () => {
    const mock = new MockAdapter(AssetApi);

    mock.onGet('/assets').reply(200, mockResponse);

    const wrapper = mount(
      <AuthProvider>
        <MemoryRouter initialEntries={['assets']}>
          <Route path="assets">
            <AssetsPage />
          </Route>
        </MemoryRouter>
      </AuthProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      wrapper.update();
    });

    expect(wrapper.find(SearchInfo).length).toBe(1);
    expect(wrapper.find(SearchInfo).at(0).contains('2')).toBe(true);
  });
});

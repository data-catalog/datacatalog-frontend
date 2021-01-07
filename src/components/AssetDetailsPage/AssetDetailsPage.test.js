import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import AssetApi from '../../apis/AssetApi';
import { AuthProvider } from '../../context/AuthContext';
import MainLoader from '../MainLoader';
import AssetDetailsPage, { DetailedViewWrapper, DescriptionData } from './AssetDetailsPage';
import { SingleTab } from './AssetDetailsPageElements';

const mockResponse = {
  id: '5fa7dcfaea3ba3525bb641a6',
  createdAt: '2020-11-08T11:56:42.924Z',
  updatedAt: '2020-12-18T13:47:10.292Z',
  name: 'FlowersP',
  description: 'Custom description',
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
};

describe('AssetDetailsPage', () => {
  it('shows loading indicator until data arrives', async () => {
    const mock = new MockAdapter(AssetApi);

    mock.onGet('/assets/1').reply(200, mockResponse);

    const wrapper = mount(
      <AuthProvider>
        <MemoryRouter initialEntries={['assets/1']}>
          <Route path="assets/:id">
            <AssetDetailsPage />
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

describe('DetailedViewWrapper', () => {
  it('Shows the name correctly', () => {
    const wrapper = shallow(<DetailedViewWrapper asset={mockResponse} />);

    expect(wrapper.contains('FlowersP')).toBe(true);
  });

  it('switches between the general and description tabs when clicked on the tab headers', () => {
    const wrapper = mount(<DetailedViewWrapper asset={mockResponse} />);

    expect(wrapper.find('GeneralData').length).toBe(1);
    expect(wrapper.find('DescriptionData').length).toBe(0);

    wrapper.find(SingleTab).at(1).simulate('click');

    expect(wrapper.find('GeneralData').length).toBe(0);
    expect(wrapper.find('DescriptionData').length).toBe(1);
  });
});

describe('DescriptionData', () => {
  it('Displays the description of the asset', () => {
    const wrapper = shallow(<DescriptionData asset={mockResponse} />);

    expect(wrapper.contains('Custom description')).toBe(true);
  });

  it('Handles the case when no description is present', () => {
    const asset = {
      ...mockResponse,
      description: undefined,
    };

    const wrapper = shallow(<DescriptionData asset={asset} />);

    expect(wrapper.contains('(No description)')).toBe(true);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import MainLoader from './MainLoader';

describe('MainLoader', () => {
  it('renders correctly', () => {
    const tree = shallow(<MainLoader />);
    expect(tree).toMatchSnapshot();
  });
});

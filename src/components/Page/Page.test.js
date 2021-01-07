import React from 'react';
import { shallow } from 'enzyme';
import Page from './Page';

describe('Page', () => {
  it('renders correctly', () => {
    const tree = shallow(<Page />);
    expect(tree).toMatchSnapshot();
  });

  it('renders its children', () => {
    const element = <p>children here</p>;
    const wrapper = shallow(<Page>{element}</Page>);

    expect(wrapper.contains(element)).toBe(true);
  });
});

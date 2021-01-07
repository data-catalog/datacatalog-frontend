import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('shows a welcome message', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.text().includes('Manage your library')).toBe(true);
  });
});

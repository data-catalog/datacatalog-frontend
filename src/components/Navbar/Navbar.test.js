import React from 'react';
import { mount, shallow } from 'enzyme';

import { BrowserRouter } from 'react-router-dom';
import Navbar, { SettingsButton } from './Navbar';
import { NavBtn, NavBtnLink } from './NavbarElements';
import { AuthProvider } from '../../context/AuthContext';

describe('NavMenu', () => {
  it('renders correctly', () => {
    const tree = shallow(
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('SettingsButton', () => {
  it('toggles the settings menu when clicked', () => {
    const content = <p>Hidden text</p>;
    const wrapper = mount(<SettingsButton>{() => content}</SettingsButton>);

    // initially it should be closed
    expect(wrapper.find(NavBtn).contains(content)).toBe(false);

    // after click it should be open
    wrapper.find(NavBtnLink).at(0).simulate('click');
    expect(wrapper.find(NavBtn).contains(content)).toBe(true);

    // after another click it should be closed again
    wrapper.find(NavBtnLink).at(0).simulate('click');
    expect(wrapper.find(NavBtn).contains(content)).toBe(false);

    wrapper.unmount();
  });
});

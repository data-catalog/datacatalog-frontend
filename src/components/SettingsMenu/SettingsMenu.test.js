import React from 'react';
import { mount } from 'enzyme';

import SettingsMenu, { LoginItem } from './SettingsMenu';
import { ItemHolder } from './SettingsMenuStyled';
import LoginModal from './AuthModals/LoginModal';
import { AuthProvider } from '../../context/AuthContext';

describe('SettingsMenu', () => {
  it('welcomes the user', () => {
    const wrapper = mount(
      <AuthProvider>
        <SettingsMenu />
      </AuthProvider>
    );

    expect(wrapper.text().includes('Log in to see more')).toBe(true);

    wrapper.unmount();
  });

  it('shows the login modal if clicked on login', () => {
    const wrapper = mount(
      <AuthProvider>
        <SettingsMenu toggleMenu={() => {}} />
      </AuthProvider>
    );

    wrapper.find(LoginItem).find(ItemHolder).at(0).simulate('click');
    expect(wrapper.find(LoginModal).length).toBe(1);

    wrapper.unmount();
  });
});

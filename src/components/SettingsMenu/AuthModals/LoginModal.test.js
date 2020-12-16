import React from 'react';
import { mount } from 'enzyme';

import LoginModal, { StyledLink } from './LoginModal';
import { AuthProvider } from '../../../context/AuthContext';

describe('LoginModal', () => {
  it('switches between login and register forms correctly', async () => {
    const wrapper = mount(
      <AuthProvider>
        <LoginModal />
      </AuthProvider>
    );
    const promiseTimeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

    expect(wrapper.find('LoginForm').length).toBe(1);
    expect(wrapper.find('RegisterForm').length).toBe(0);

    // show the register form after clicking
    wrapper.find(StyledLink).at(0).simulate('click');

    // wait for the animation to finish
    await promiseTimeout(500);
    wrapper.update();

    expect(wrapper.find('LoginForm').length).toBe(0);
    expect(wrapper.find('RegisterForm').length).toBe(1);

    // switch back to login form
    wrapper.find(StyledLink).at(0).simulate('click');

    // wait for the animation to finish
    await promiseTimeout(500);
    wrapper.update();

    expect(wrapper.find('LoginForm').length).toBe(1);
    expect(wrapper.find('RegisterForm').length).toBe(0);
  });
});

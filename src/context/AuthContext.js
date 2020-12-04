import React, { createContext, useState } from 'react';
import UserApi from '../apis/UserApi';

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = async (data) => {
    const response = await UserApi.post('users/login', JSON.stringify(data));

    UserApi.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    localStorage.setItem('access_token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    delete UserApi.defaults.headers.Authorization;

    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }} {...props} />;
};

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };

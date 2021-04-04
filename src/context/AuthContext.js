import React, { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { cache, mutate } from 'swr';
import UserApi from '../apis/UserApi';

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  const login = async (data) => {
    const response = await UserApi.post('/users/login', JSON.stringify(data));

    localStorage.setItem('access_token', response.data.token);
    setUser(jwtDecode(response.data.token));
    cache.keys().forEach((key) => mutate(key));
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    cache.keys().forEach((key) => mutate(key));
  };

  return <AuthContext.Provider value={{ user, login, logout }} {...props} />;
};

export default AuthContext;
export { AuthProvider };

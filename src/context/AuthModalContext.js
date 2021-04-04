import React, { createContext, useState } from 'react';

const AuthModalContext = createContext();

const AuthModalProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState('login');

  return <AuthModalContext.Provider value={{ open, setOpen, variant, setVariant }} {...props} />;
};

export default AuthModalContext;
export { AuthModalProvider };

import { useContext } from 'react';
import AuthModalContext from '../context/AuthModalContext';

export default function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider.');
  }
  const { setOpen, setVariant } = context;

  const showLogin = () => {
    setVariant('login');
    setOpen(true);
  };

  const showRegister = () => {
    setVariant('register');
    setOpen(true);
  };

  return { showLogin, showRegister };
}

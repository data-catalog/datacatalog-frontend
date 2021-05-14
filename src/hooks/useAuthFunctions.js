import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function useAuthFunctions() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthFunctions must be used within an AuthProvider.');
  }
  const { login, logout } = context;
  return { login, logout };
}

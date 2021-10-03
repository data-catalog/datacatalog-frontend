import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function useUser() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within an AuthProvider.');
  }
  return context.user;
}

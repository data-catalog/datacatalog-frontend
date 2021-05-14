import React from 'react';
import { Route } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { UnauthorizedPage } from '../pages/ErrorPage';

export default function ProtectedRoute({ children, onlyAdmin, ...props }) {
  const user = useUser();

  return (
    <Route
      {...props}
      render={() => {
        if (!user || (onlyAdmin && user.role !== 'ADMIN')) {
          return <UnauthorizedPage />;
        }

        return children;
      }}
    />
  );
}

ProtectedRoute.defaultProps = {
  onlyAdmin: false,
};

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotificationsProvider, setUpNotifications } from 'reapop';
import { AuthProvider } from '../../context/AuthContext';
import { AuthModalProvider } from '../../context/AuthModalContext';
import AssetDetailsPage from '../../pages/AssetDetailsPage';
import AssetSearchPage from '../../pages/AssetSearchPage';
import CreateAssetPage from '../../pages/CreateAssetPage';
import EditAssetPage from '../../pages/EditAssetPage';
import ErrorPage from '../../pages/ErrorPage';
import HomePage from '../../pages/HomePage';
import SearchUsersPage from '../../pages/SearchUsersPage';
import UserAssetsPage from '../../pages/UserAssetsPage';
import Page from '../Page';
import ProtectedRoute from '../ProtectedRoute';

const App = () => {
  setUpNotifications({
    defaultProps: {
      position: 'top-center',
      dismissible: true,
      showDismissButton: true,
      dismissAfter: 3000,
    },
  });
  return (
    <Router>
      <NotificationsProvider>
        <AuthProvider>
          <AuthModalProvider>
            <Page>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <ProtectedRoute onlyAdmin path="/users/search/:searchTerm?">
                  <SearchUsersPage />
                </ProtectedRoute>
                <ProtectedRoute exact path="/user/assets">
                  <UserAssetsPage />
                </ProtectedRoute>
                <ProtectedRoute exact path="/assets/create">
                  <CreateAssetPage />
                </ProtectedRoute>
                <Route path="/assets/search/:searchTerm?">
                  <AssetSearchPage />
                </Route>
                <Route exact path="/assets/:assetId">
                  <AssetDetailsPage />
                </Route>
                <ProtectedRoute path="/assets/:assetId/edit">
                  <EditAssetPage />
                </ProtectedRoute>
                <Route path="*">
                  <ErrorPage />
                </Route>
              </Switch>
            </Page>
          </AuthModalProvider>
        </AuthProvider>
      </NotificationsProvider>
    </Router>
  );
};

export default App;

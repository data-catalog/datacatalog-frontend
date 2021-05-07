import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { NotificationsProvider, setUpNotifications } from 'reapop';
import { AuthProvider } from '../../context/AuthContext';
import { AuthModalProvider } from '../../context/AuthModalContext';
import AssetDetailsPage from '../../pages/AssetDetailsPage';
import AssetSearchPage from '../../pages/AssetSearchPage';
import CreateAssetPage from '../../pages/CreateAssetPage';
import DocumentationPage from '../../pages/DocumentationPage';
import EditAssetPage from '../../pages/EditAssetPage';
import EditProfilePage from '../../pages/EditProfilePage';
import ErrorPage from '../../pages/ErrorPage';
import HomePage from '../../pages/HomePage';
import SearchUsersPage from '../../pages/SearchUsersPage';
import UserAssetsPage from '../../pages/UserAssetsPage';
import AuthModal from '../AuthModal';
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
            <AuthModal />

            <Switch>
              <Route exact path="/docs">
                <Redirect to="/docs/asset" />
              </Route>
              <Route exact path="/docs/asset">
                <DocumentationPage api="asset" />
              </Route>
              <Route exact path="/docs/user">
                <DocumentationPage api="user" />
              </Route>
              <Route exact path="/docs/versioning">
                <DocumentationPage api="versioning" />
              </Route>

              <Route exact path="/">
                <HomePage />
              </Route>

              <ProtectedRoute onlyAdmin path="/users/search/:searchTerm?">
                <SearchUsersPage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/user/assets">
                <UserAssetsPage />
              </ProtectedRoute>
              <ProtectedRoute exact path="/user/settings">
                <EditProfilePage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/assets/create">
                <CreateAssetPage />
              </ProtectedRoute>
              <Route exact path={['/assets', '/assets/search/:searchTerm?']}>
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
          </AuthModalProvider>
        </AuthProvider>
      </NotificationsProvider>
    </Router>
  );
};

export default App;

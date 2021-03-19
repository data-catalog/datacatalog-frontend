import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';

import AssetsPage from '../../pages/AssetsPage';
import AssetDetailsPage from '../../pages/AssetDetailsPage';
import CreateAssetPage from '../../pages/CreateAssetPage';

import { SearchInfo } from '../../pages/AssetsPage/AssetsPageElements';
import Page from '../Page';

const App = () => (
  <AuthProvider>
    <Router>
      <Page>
        <Switch>
          <Route exact path="/">
            <SearchInfo>Search for data to see results!</SearchInfo>
          </Route>

          <Route path="/assets/search/:searchTerm?">
            <AssetsPage />
          </Route>

          <Route path="/assets/:id">
            <AssetDetailsPage />
          </Route>

          <Route path="/create">
            <CreateAssetPage />
          </Route>
        </Switch>
      </Page>
    </Router>
  </AuthProvider>
);

export default App;

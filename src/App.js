import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import AppWrapper from './components/Main/Main';

const App = () => {
  const [searchResults, setSearchResults] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [isDetailed, setIsDetailed] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Navbar
          setIsLoading={setIsLoading}
          setIsInitial={setIsInitial}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setIsDetailed={setIsDetailed}
        />
        <AppWrapper
          isLoading={isLoading}
          isInitial={isInitial}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setIsDetailed={setIsDetailed}
          isDetailed={isDetailed}
          setIsLoading={setIsLoading}
          setIsInitial={setIsInitial}
        />
      </Router>
    </AuthProvider>
  );
};

export default App;

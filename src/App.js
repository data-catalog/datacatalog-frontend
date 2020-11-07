import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import FilterModal from './components/SearchBar/FilterModal/FilterModal';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar openModal={openModal} />
        <FilterModal showModal={showModal} setShowModal={setShowModal} />
        <Switch>
          <Route path="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;

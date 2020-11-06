import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import FilterModal from './components/SearchBar/FilterModal/FilterModal';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Router>
        <Navbar openModal={openModal} />
        <FilterModal showModal={showModal} setShowModal={setShowModal} />
        <Switch>
          <Route path="/" />
        </Switch>
      </Router>
    </>
  );
};

export default App;

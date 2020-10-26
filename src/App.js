import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import FilterModal from './components/Searchbar/FilterModal/FilterModal'

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }

  return (
    <>
      <Router>
          <Navbar openModal={openModal}/>
          <FilterModal showModal={showModal} setShowModal={setShowModal} />
          <Switch>
            <Route path='/' />
          </Switch>
      </Router>
    </>
  );
}

export default App;

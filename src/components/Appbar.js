import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { MdSearch, MdMenu } from 'react-icons/md';
import { useAuthFunctions, useUser, useNotify, useAuthModal } from '../hooks';

function LoggedInDropdown() {
  const { logout } = useAuthFunctions();
  const notify = useNotify();

  const handleLogout = () => {
    logout();
    notify('Successfully logged out!', 'success');
  };

  return (
    <>
      <NavDropdown.Item as={Link} to="/user/settings">
        Profile Settings
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/user/assets">
        My assets
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/assets/create">
        Import Dataset
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item bsPrefix="d-flex justify-content-center" as="div">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </NavDropdown.Item>
    </>
  );
}

function GuestDropdown() {
  const { showLogin } = useAuthModal();

  return (
    <>
      <NavDropdown.Item bsPrefix="d-flex justify-content-center" as="div">
        <Button variant="success" onClick={showLogin}>
          Login
        </Button>
      </NavDropdown.Item>
    </>
  );
}

function GuestNavs() {
  return (
    <>
      <Nav.Link as={Link} to="/assets/search">
        Library
      </Nav.Link>
    </>
  );
}

function UserNavs() {
  return (
    <>
      <Nav.Link as={Link} to="/assets/create">
        Create Asset
      </Nav.Link>
    </>
  );
}

function AdminNavs() {
  return (
    <>
      <Nav.Link as={Link} to="/users/search">
        Manage Users
      </Nav.Link>
    </>
  );
}

export default function Appbar() {
  const history = useHistory();
  const user = useUser();

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/assets/search/${e.target.searchTerm.value}`);
    e.target.reset();
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand as={Link} to="/">
          Data Catalog
        </Navbar.Brand>

        <Form inline onSubmit={handleSearch}>
          <InputGroup size="sm">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <MdSearch />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type="text" name="searchTerm" placeholder="Search..." className="mr-sm-2" />
          </InputGroup>
        </Form>

        <Navbar.Toggle className="border-0">
          <MdMenu />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="ml-auto">
            {user && <UserNavs />}
            <GuestNavs />
            {user?.role === 'ADMIN' && <AdminNavs />}

            <NavDropdown alignRight title="Account" id="nav-dropdown">
              <NavDropdown.Header className="text-center">Welcome, {user?.username || 'user'}!</NavDropdown.Header>
              <NavDropdown.Divider />
              {user ? <LoggedInDropdown user={user} /> : <GuestDropdown />}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

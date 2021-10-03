import React from 'react';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuthFunctions, useAuthModal, useNotify, useUser } from '../hooks';

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
      <Nav.Link as={Link} to="/docs">
        Documentation
      </Nav.Link>
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

export default function NavItems({ variant }) {
  const user = useUser();

  return (
    <>
      <Navbar.Toggle className="border-0">
        <MdMenu />
      </Navbar.Toggle>
      <Navbar.Collapse>
        {variant === 'docs' && (
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/docs/user">
              User Service API
            </Nav.Link>
            <Nav.Link as={Link} to="/docs/asset">
              Asset Service API
            </Nav.Link>
            <Nav.Link as={Link} to="/docs/versioning">
              Versioning Service API
            </Nav.Link>
          </Nav>
        )}

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
    </>
  );
}

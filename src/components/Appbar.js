import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { MdSearch } from 'react-icons/md';
import NavItems from './NavItems';

export default function Appbar({ variant }) {
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/assets/search/${e.target.searchTerm.value}`);
    e.target.reset();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Data Catalog
      </Navbar.Brand>

      {['normal', 'landing'].includes(variant) && (
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
      )}

      <NavItems variant={variant} />
    </Navbar>
  );
}

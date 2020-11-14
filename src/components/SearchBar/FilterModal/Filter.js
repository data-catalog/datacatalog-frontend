import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { FaFilter } from 'react-icons/fa';
import Modal from 'react-modal';
import { Range } from 'rc-slider';
import { Colors } from '../../Global/Colors';
import {
  ModalContainer,
  FilterHeader,
  FilterButton,
  Form,
  FieldLabel,
  OrderBySelect,
  SelectOption,
  Button,
  ButtonContainer,
  Input,
} from './FilterStyles';
import 'rc-slider/assets/index.css';

const SaveFilterSettings = (sizeBounds, order, owner) => {
  localStorage.setItem('lowerSizeBound', sizeBounds[0]);
  localStorage.setItem('upperSizeBound', sizeBounds[1]);
  localStorage.setItem('orderFilter', order);
  localStorage.setItem('ownerFilter', owner);
};

const ResetDefaultFilter = () => {};

const FilterForm = () => {
  const [sizeBounds, setSizeBounds] = useState([0, 1000]);
  const [ownerFilter, setOwnerFilter] = useState(null);
  const [orderFilter, setOrderFilter] = useState('newest');

  return (
    <>
      <Form>
        <FieldLabel>
          Order by{' '}
          <OrderBySelect>
            <SelectOption value="newest">Newest first</SelectOption>
            <SelectOption value="oldest">Oldest first</SelectOption>
            <SelectOption value="popular">Most popular</SelectOption>
          </OrderBySelect>
        </FieldLabel>

        <FieldLabel>
          Uploaded by <Input type="text" name="owner" placeholder="Owner ID" />
        </FieldLabel>

        <FieldLabel>
          Size: {sizeBounds[0]} MB - {sizeBounds[1]} MB
        </FieldLabel>
        <Range defaultValue={[0, 1000]} max={10000} onChange={setSizeBounds} />
      </Form>
      <ButtonContainer>
        <Button onClick={SaveFilterSettings(sizeBounds, ownerFilter, orderFilter)}>Save</Button>
        <Button>Reset</Button>
      </ButtonContainer>
    </>
  );
};

const Filter = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <FilterButton
        onClick={() => {
          setFilterOpen(true);
        }}
      >
        <FaFilter />
      </FilterButton>
      <ThemeProvider theme={Colors}>
        <Modal
          isOpen={isFilterOpen}
          onRequestClose={() => setFilterOpen(false)}
          contentLabel="Filter Modal"
          className="FilterModal"
          closeTimeoutMS={500}
        >
          <ModalContainer>
            <FilterHeader>Filter your search!</FilterHeader>
            <FilterForm />
          </ModalContainer>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default Filter;

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

const ResetDefaultFilter = () => {
  localStorage.removeItem('lowerSizeBound');
  localStorage.removeItem('upperSizeBound');
  localStorage.removeItem('orderFilter');
  localStorage.removeItem('ownerFilter');
  localStorage.removeItem('tagsFilter');
};

const OrderField = ({ orderFilter, setOrderFilter }) => {
  return (
    <FieldLabel>
      Order by{' '}
      <OrderBySelect
        value={orderFilter || ''}
        onChange={(event) => {
          setOrderFilter(event.target.value);
          localStorage.setItem('orderFilter', event.target.value);
        }}
      >
        <SelectOption value="newest">Newest first</SelectOption>
        <SelectOption value="oldest">Oldest first</SelectOption>
        <SelectOption value="popular">Most popular</SelectOption>
      </OrderBySelect>
    </FieldLabel>
  );
};

const OwnerField = ({ ownerFilter, setOwnerFilter }) => {
  return (
    <FieldLabel>
      Uploaded by{' '}
      <Input
        type="text"
        name="owner"
        placeholder="Owner ID"
        value={ownerFilter || ''}
        onChange={(event) => {
          setOwnerFilter(event.target.value);
          localStorage.setItem('ownerFilter', event.target.value);
        }}
      />
    </FieldLabel>
  );
};

const TagsField = ({ tagsFilter, setTagsFilter }) => {
  return (
    <FieldLabel>
      Tags{' '}
      <Input
        type="text"
        name="tags"
        placeholder="Separated by comma!"
        value={tagsFilter || ''}
        onChange={(event) => {
          setTagsFilter(event.target.value);
          localStorage.setItem('tagsFilter', event.target.value);
        }}
      />
    </FieldLabel>
  );
};

const SizeField = ({ sizeBounds, setSizeBounds }) => {
  return (
    <>
      <FieldLabel>
        Size: {sizeBounds[0]} MB - {sizeBounds[1]} MB
      </FieldLabel>
      <Range
        value={sizeBounds}
        max={10000}
        onChange={(values) => {
          setSizeBounds(values);
          localStorage.setItem('lowerSizeBound', sizeBounds[0]);
          localStorage.setItem('upperSizeBound', sizeBounds[1]);
        }}
      />
    </>
  );
};

const FilterForm = () => {
  const [sizeBounds, setSizeBounds] = useState([
    localStorage.getItem('lowerSizeBound'),
    localStorage.getItem('upperSizeBound'),
  ]);
  if (sizeBounds[0] == null) {
    setSizeBounds([0, 1000]);
  }
  const [ownerFilter, setOwnerFilter] = useState(localStorage.getItem('ownerFilter'));
  const [orderFilter, setOrderFilter] = useState(localStorage.getItem('orderFilter'));
  const [tagsFilter, setTagsFilter] = useState(localStorage.getItem('tagsFilter'));

  return (
    <>
      <Form>
        <OrderField orderFilter={orderFilter} setOrderFilter={setOrderFilter} />
        <OwnerField ownerFilter={ownerFilter} setOwnerFilter={setOwnerFilter} />
        <TagsField tagsFilter={tagsFilter} setTagsFilter={setTagsFilter} />
        <SizeField sizeBounds={sizeBounds} setSizeBounds={setSizeBounds} />
      </Form>
      <ButtonContainer>
        <Button
          onClick={() => {
            ResetDefaultFilter();
            setOwnerFilter('');
            setSizeBounds([0, 1000]);
            setTagsFilter('');
            setOrderFilter('');
          }}
        >
          Reset
        </Button>
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

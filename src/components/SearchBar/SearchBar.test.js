import React from 'react';
import { shallow } from 'enzyme';
import Searchbar from './SearchBar';
import { SearchTerm } from './SearchbarElements';

describe('SearchBar', () => {
  it('allows to write keywords in the searchbar', () => {
    const wrapper = shallow(<Searchbar />);

    wrapper
      .find(SearchTerm)
      .at(0)
      .simulate('change', { target: { value: 'Keyword' } });

    expect(wrapper.find(SearchTerm).at(0).props().value).toEqual('Keyword');
  });
});

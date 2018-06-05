import React from 'react';
import { mount } from 'enzyme';
import SearchBar from './';
import context from '../../__mocks__/context';

describe('SearchBar', () => {
  it('Renders a textfield, selectfield and button', () => {
    const sb = mount(<SearchBar />);

    expect(sb.find('Input[type="text"]')).toHaveLength(1);
    expect(sb.find('Input[type="select"]')).toHaveLength(1);
    expect(sb.find('Button')).toHaveLength(1);
  });

  it('Term field value comes from context.state.term', () => {
    context.state.term = 'Spam';
    const sb = mount(<SearchBar />);

    expect(sb.find('Input[name="search-term"]').prop('value')).toEqual('Spam');
  });

  it('Type field value comes from context.state.type', () => {
    context.state.type = 'album';
    const sb = mount(<SearchBar />);

    expect(sb.find('Input[name="search-type"]').prop('value')).toEqual('album');
  });

  it('Updates term when textfield gets changed', () => {
    const sb = mount(<SearchBar />);
    const event = { target: { value: 'broccoli' } };
    // sb.simulate('change') not working...
    sb.find('Input[name="search-term"]').prop('onChange')(event);

    expect(context.setTerm).toHaveBeenCalledWith('broccoli');
  });

  it('Updates type when selectfield gets changed', () => {
    const sb = mount(<SearchBar />);
    const event = { target: { value: 'Foobar' } };
    // sb.simulate('change') not working...
    sb.find('Input[name="search-type"]').prop('onChange')(event);

    expect(context.setType).toHaveBeenCalledWith('Foobar');
  });

  it('Calls search if button is clicked', () => {
    const sb = mount(<SearchBar />);
    sb.find('Button').simulate('click');

    expect(context.search).toHaveBeenCalled();
  });

  it('Disable fields if context is loading results', () => {
    context.state.isLoadingResults = true;

    const sb = mount(<SearchBar />);

    expect(sb.find('Input[name="search-term"]').prop('disabled')).toBeTruthy();
    expect(sb.find('Input[name="search-type"]').prop('disabled')).toBeTruthy();
    expect(sb.find('Button').prop('disabled')).toBeTruthy();
  });
});

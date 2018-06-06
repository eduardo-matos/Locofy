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
    const sb = mount(<SearchBar />);
    sb.setState({ term: 'Spam' });

    expect(sb.find('Input[name="search-term"]').prop('value')).toEqual('Spam');
  });

  it('Type field value comes from context.state.type', () => {
    const sb = mount(<SearchBar />);
    sb.setState({ type: 'album' });

    expect(sb.find('Input[name="search-type"]').prop('value')).toEqual('album');
  });

  it('Updates term when textfield gets changed', () => {
    const sb = mount(<SearchBar />);
    const event = { target: { value: 'broccoli' } };
    // sb.simulate('change') not working...
    sb.find('Input[name="search-term"]').prop('onChange')(event);

    expect(sb.state().term).toEqual('broccoli');
  });

  it('Updates type when selectfield gets changed', () => {
    const sb = mount(<SearchBar />);
    const event = { target: { value: 'Foobar' } };
    // sb.simulate('change') not working...
    sb.find('Input[name="search-type"]').prop('onChange')(event);

    expect(sb.state().type).toEqual('Foobar');
  });

  it('Calls search if button is clicked', () => {
    const sb = mount(<SearchBar />);
    sb.setState({ term: 'Yay', type: 'Wow' });
    sb.find('Button').simulate('click');

    expect(context.search).toHaveBeenCalledWith('Yay', 'Wow');
  });

  it('Disable fields if context is loading results', () => {
    context.state.isLoadingResults = true;

    const sb = mount(<SearchBar />);

    expect(sb.find('Input[name="search-term"]').prop('disabled')).toBeTruthy();
    expect(sb.find('Input[name="search-type"]').prop('disabled')).toBeTruthy();
    expect(sb.find('Button').prop('disabled')).toBeTruthy();
  });

  it('Sets invalid if submits with blank term', () => {
    const sb = mount(<SearchBar />);
    sb.setState({ isValid: true });

    sb.find('Button').simulate('click');
    expect(sb.state().isValid).toBeFalsy();
  });

  it('Adds error to term field if state is invalid', () => {
    const sb = mount(<SearchBar />);
    sb.setState({ isValid: false });

    expect(sb.find('Input[name="search-term"]').prop('error')).toEqual(' ');
  });

  it('Removes error from term field if state is invalid', () => {
    const sb = mount(<SearchBar />);
    sb.setState({ isValid: true });

    expect(sb.find('Input[name="search-term"]').prop('error')).toEqual('');
  });
});

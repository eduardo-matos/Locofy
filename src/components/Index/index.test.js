import React from 'react';
import { mount } from 'enzyme';
import Index from './';
import context from '../../__mocks__/context';

describe('Index', () => {
  it('Renders SearchBar and SearchResults', () => {
    context.state.isLoggedIn = true
    const index = mount(<Index match={{ params: {} }} />);

    expect(index.find('SearchBar')).toHaveLength(1);
    expect(index.find('SearchResults')).toHaveLength(1);
  });

  // Not sure how to test it
  xit('Redirects to "/login" if isLoggedIn is false');
});

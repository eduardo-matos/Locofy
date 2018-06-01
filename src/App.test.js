import React from 'react';
import { mount } from 'enzyme';
import App from './App';

it('Finds app title', () => {
  const title = mount(<App />).find('.App-title');

  expect(title).toHaveLength(1);
  expect(title.text()).toEqual('Welcome to Locofy')
});

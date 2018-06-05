import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import Login from './components/Login';
import Index from './components/Index';

describe('App', () => {
  it('Has all routes', () => {
    const app = mount(<App />);
    const routes = app.find('Route');

    expect(routes).toHaveLength(3);
    expect(routes.at(0).props()).toEqual({ path: '/', exact: true, component: Index });
    expect(routes.at(1).props()).toEqual({ path: '/login', exact: true, component: Login });
    expect(routes.at(2).props()).toEqual({ path: '/login/:token', exact: true, component: Login });
  });
});

import React from 'react';
import { mount, shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import Login from './';
import { LOGIN_URL } from '../../config';
import context from '../../__mocks__/context';

describe('Login', () => {
  it('Has link to external login', () => {
    const login = mount(<Login match={{ params: {} }} />);
    expect(login.find('.login-link').prop('href')).toEqual(LOGIN_URL);
  });

  it('Calls setToken if a token is found', () => {
    mount(<Login match={{ params: { token: 'spam' } }} />);
    expect(context.setToken).toHaveBeenCalledWith('spam');
  });

  it('Doesn\'t call setToken if a token is not found', () => {
    mount(<Login match={{ params: { token: '' } }} />);
    expect(context.setToken).not.toHaveBeenCalled();
  });

  // Not sure how to test it
  xit('Redirects to "/" if isLoggedIn');
});

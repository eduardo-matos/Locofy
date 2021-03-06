import React from 'react';
import { mount } from 'enzyme';
import Login from './';
import { LOGIN_URL } from '../../config';
import context from '../../__mocks__/context';

describe('Login', () => {
  it('Has link to external login', () => {
    const login = mount(<Login location={{ search: '' }} />);
    expect(login.find('.login-link').prop('href')).toEqual(LOGIN_URL);
  });

  it('Calls setToken if a token is found', () => {
    mount(<Login location={{ search: '?jwt=spam' }} />);
    expect(context.setToken).toHaveBeenCalledWith('spam');
  });

  it('Doesn\'t call setToken if a token is not found', () => {
    mount(<Login location={{ search: '' }} />);
    expect(context.setToken).not.toHaveBeenCalled();
  });

  // Not sure how to test it
  xit('Redirects to "/" if isLoggedIn');
});

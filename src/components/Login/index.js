import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import { LOGIN_URL } from '../../config';
import AppContext from '../../AppContext';
import logo from '../../logo.png';
import './Login.css';

function Login({ location }) {
  const querystring = parseQuerystring(location.search);
  const hasError = 'e' in querystring;
  const token = querystring.jwt;

  return (
    <AppContext.Consumer>
      {(context) => {
        if (context.state.isLoggedIn) return <Redirect to="/" />;
        if (token) return context.setToken(token) || <div />;

        return (
          <div className="center login-btn-container">
            {hasError && <Modal header="Error" open>There as an error during login</Modal>}
            <a href={LOGIN_URL} className="login-link"><img src={logo} alt="" className="btn-logo" /> Login with Spotify</a>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

Login.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

function parseQuerystring(querystring) {
  const qs = (querystring[0] === '?') ? querystring.slice(1) : querystring;
  const keyValuePairs = qs.split('&').map(segment => segment.split('='));

  const result = {};

  keyValuePairs.forEach(([key, val]) => {
    result[key] = (val === undefined) ? true : val;
  });

  return result;
}

export default Login;

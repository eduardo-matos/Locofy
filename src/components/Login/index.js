import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import qs from 'query-string';
import { LOGIN_URL } from '../../config';
import AppContext from '../../AppContext';
import logo from '../../logo.png';
import './Login.css';

function Login({ location }) {
  const querystring = qs.parse(location.search);
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

export default Login;

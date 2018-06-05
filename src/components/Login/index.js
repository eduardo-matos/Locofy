import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { LOGIN_URL } from '../../config';
import AppContext from '../../AppContext';
import logo from '../../logo.png';
import './Login.css';

function Login({ match }) {
  const { token } = match.params;

  return (
    <AppContext.Consumer>
      {(context) => {
        if (context.state.isLoggedIn) return <Redirect to="/" />;
        if (token) return context.setToken(token) || <div />;

        return (
          <div className="center login-btn-container">
            <a href={LOGIN_URL} className="login-link"><img src={logo} alt="" className="btn-logo" /> Login with Spotify</a>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

Login.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Login;

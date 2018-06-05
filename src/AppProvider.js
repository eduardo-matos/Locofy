/* eslint react/no-unused-state: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react';
import PropType from 'prop-types';
import $ from 'jquery';
import { API_SEARCH_URL } from './config';
import AppContext from './AppContext';

export default class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem('token') || '';

    this.state = {
      results: [],
      type: 'artist',
      term: '',
      token,
      isLoggedIn: !!token,
      isLoadingResults: false,
    };
  }

  setToken(token) {
    localStorage.setItem('token', token);
    this.setState({ token, isLoggedIn: true });
  }

  setTerm(term) {
    this.setState({ term });
  }

  setType(type) {
    this.setState({ type });
  }

  search() {
    this.setState({ isLoadingResults: true });

    return $.ajax({
      url: API_SEARCH_URL,
      type: 'GET',
      data: { term: this.state.term, type: this.state.type },
      headers: { Authorization: `Bearer ${this.state.token}` },
      dataType: 'json',
    })
      .then((data) => {
        this.setState({ results: data, isLoadingResults: false });
      })
      .catch(() => {
        this.setState({ isLoggedIn: false, token: '', isLoadingResults: false });
      });
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setToken: this.setToken.bind(this),
          setTerm: this.setTerm.bind(this),
          setType: this.setType.bind(this),
          search: this.search.bind(this),
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropType.element.isRequired,
};

/* eslint react/no-unused-state: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react';
import PropType from 'prop-types';
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

  search(term, type) {
    this.setState({ term, type, isLoadingResults: true });

    return global.$.ajax({
      url: API_SEARCH_URL,
      method: 'GET',
      data: { term, type },
      headers: { Authorization: `Bearer ${this.state.token}` },
      dataType: 'json',
    })
      .then((data) => {
        this.setState({ results: data, isLoadingResults: false });
      }, () => {
        this.setState({
          isLoggedIn: false,
          token: '',
          results: [],
          isLoadingResults: false,
        });
      });
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setToken: this.setToken.bind(this),
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

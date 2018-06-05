import React from 'react';
import { Redirect } from 'react-router-dom';
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';
import AppHeader from '../AppHeader';
import AppContext from '../../AppContext';

function Index() {
  return (
    <AppContext.Consumer>
      {(context) => {
        if (!context.state.isLoggedIn) return <Redirect to="/login" />;

        return (
          <React.Fragment>
            <AppHeader />
            <div className="container">
              <SearchBar />
              <SearchResults />
            </div>
          </React.Fragment>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Index;

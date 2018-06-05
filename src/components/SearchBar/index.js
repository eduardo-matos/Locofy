import React from 'react';
import { Row, Col, Input, Button, Icon } from 'react-materialize';
import AppContext from '../../AppContext';
import './SearchBar.css';

function SearchBar() {
  return (
    <div>
      <AppContext.Consumer>
        {context => (
          <Row>
            <Col s={12} m={7}>
              <Input
                s={12}
                type="text"
                placeholder="Eg.: Christina Aguilera"
                value={context.state.term}
                onChange={e => context.setTerm(e.target.value)}
                name="search-term"
                disabled={context.state.isLoadingResults}
              />
            </Col>
            <Col s={8} m={3}>
              <Input
                s={12}
                type="select"
                value={context.state.type}
                onChange={e => context.setType(e.target.value)}
                name="search-type"
                disabled={context.state.isLoadingResults}
              >
                <option value="artist">Artist</option>
                <option value="track">Song</option>
                <option value="album">Album</option>
              </Input>
            </Col>
            <Col s={4} m={2} className="search-btn-container">
              <Button
                s={12}
                className="search-btn"
                onClick={context.search}
                disabled={context.state.isLoadingResults}
              >
                <Icon>search</Icon>
              </Button>
            </Col>
          </Row>
        )}
      </AppContext.Consumer>
    </div>
  );
}

export default SearchBar;

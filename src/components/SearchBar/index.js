import React from 'react';
import { Row, Col, Input, Button, Icon } from 'react-materialize';
import AppContext from '../../AppContext';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      type: 'artist',
      isValid: true,
    };
  }

  setTerm(term) {
    this.setState({ term, isValid: true });
  }

  submit(searchFn) {
    this.setState({ isValid: !!this.state.term }, () => {
      if (this.state.isValid) searchFn(this.state.term, this.state.type);
    });
  }

  render() {
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
                  value={this.state.term}
                  onChange={e => this.setTerm(e.target.value)}
                  name="search-term"
                  disabled={context.state.isLoadingResults}
                  error={this.state.isValid ? '' : ' '}
                />
              </Col>
              <Col s={8} m={3}>
                <Input
                  s={12}
                  type="select"
                  value={this.state.type}
                  onChange={e => this.setState({ type: e.target.value })}
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
                  onClick={() => this.submit(context.search)}
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
}

export default SearchBar;

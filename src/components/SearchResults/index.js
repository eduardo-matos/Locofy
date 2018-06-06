import React from 'react';
import { Row, Col, Preloader } from 'react-materialize';
import Artist from './Artist';
import Track from './Track';
import Album from './Album';
import AppContext from '../../AppContext';
import './SearchResults.css';

const COMPONENT_MAPPING = {
  artist: Artist,
  track: Track,
  album: Album,
};

function SearchResults() {
  return (
    <AppContext.Consumer>
      {(context) => {
        if (context.state.isLoadingResults) return <div className="center"><Preloader size="big" /></div>;
        if (!context.state.results.length) return <div className="center">No results</div>;

        return (
          <div className="search-results">
            {chunckfy(context.state.results, 3).map((items) => {
              const Component = COMPONENT_MAPPING[context.state.type];

              return (
                <Row key={Math.random()}>
                  {
                    items.map(item => (
                      <Col s={12} m={4} key={item.id || Math.random()}>
                        <Component {...item} />
                      </Col>
                    ))
                  }
                </Row>
              );
            })}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

function chunckfy(array, size) {
  const result = [];
  for (let i = 0, j = array.length; i < j; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default SearchResults;

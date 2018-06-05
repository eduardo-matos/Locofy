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
          <Row>
            {context.state.results.map((item) => {
              const Component = COMPONENT_MAPPING[context.state.type];
              return <Col s={12} m={4} key={item.id || Math.random()}><Component {...item} /></Col>;
            })}
          </Row>
        );
      }}
    </AppContext.Consumer>
  );
}

export default SearchResults;

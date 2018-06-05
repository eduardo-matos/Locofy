import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, Chip } from 'react-materialize';
import Popularity from '../Popularity';

function Artist({
  name,
  image,
  genres,
  popularity,
}) {
  return (
    <Card
      header={<CardTitle image={image} />}
      title={name}
      className="truncate result-item"
    >
      <div className="artist-genres">{genres.map(genre => <Chip key={genre}>{genre}</Chip>)}</div>
      <Popularity value={popularity} />
    </Card>
  );
}

Artist.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  popularity: PropTypes.number.isRequired,
};

export default Artist;

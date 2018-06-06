import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, Chip } from 'react-materialize';
import Popularity from '../Popularity';
import { DEFAULT_IMAGE } from '../../../config';

function Artist({
  name,
  image,
  genres,
  popularity,
}) {
  return (
    <Card
      header={<CardTitle image={image || DEFAULT_IMAGE} />}
      title={name}
      className="truncate"
    >
      <div className="artist-genres">{genres.map(genre => <Chip key={genre}>{genre}</Chip>)}</div>
      <Popularity value={popularity} />
    </Card>
  );
}

Artist.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  popularity: PropTypes.number.isRequired,
};

Artist.defaultProps = {
  image: null,
};

export default Artist;

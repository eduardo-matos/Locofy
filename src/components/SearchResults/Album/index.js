import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'react-materialize';
import { DEFAULT_IMAGE } from '../../../config';

function Album({
  image,
  name,
  artists,
  availability,
}) {
  return (
    <Card
      header={<CardTitle image={image || DEFAULT_IMAGE} />}
      title={name}
      className="truncate"
    >
      <p><strong>Artist:</strong> <span className="album-artist-name">{artists.length > 1 ? 'Various Artists' : artists[0]}</span></p>
      <p><strong>Availability:</strong> <span className="album-availability">{availability ? 'Available' : 'Unavailable'}</span></p>
    </Card>
  );
}

Album.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(PropTypes.string).isRequired,
  availability: PropTypes.bool.isRequired,
};

Album.defaultProps = {
  image: null,
};

export default Album;

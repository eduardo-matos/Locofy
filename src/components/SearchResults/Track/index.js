/* eslint camelcase: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'react-materialize';

function humanizeDuration(durationInMilliseconds) {
  const minutes = Math.floor(durationInMilliseconds / 60000);
  const seconds = ((durationInMilliseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

function Track({
  image,
  name,
  artists,
  album,
  duration_ms,
}) {
  return (
    <Card
      header={<CardTitle image={image} />}
      title={name}
      className="truncate"
    >
      <p className="truncate"><strong>Artist:</strong> <span className="track-artists">{artists.join(', ')}</span></p>
      <p className="truncate"><strong>Album:</strong> <span className="track-album">{album}</span></p>
      <p className="truncate"><strong>Duration:</strong> <span className="track-duration">{humanizeDuration(duration_ms)}</span></p>
    </Card>
  );
}

Track.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(PropTypes.string).isRequired,
  album: PropTypes.string.isRequired,
  duration_ms: PropTypes.number.isRequired,
};

export default Track;

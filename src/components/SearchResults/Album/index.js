import React from 'react';
import { Card, CardTitle } from 'react-materialize';

function Album() {
  return (
    <Card
      header={<CardTitle image={this.props.image} />}
      title={this.props.name}
      className="truncate"
    >
      <p><strong>Artist:</strong> <span className="album-artist-name">{this.props.artists.length > 1 ? 'Various Artists' : this.props.artists[0]}</span></p>
      <p><strong>Availability:</strong> <span className="album-availability">{this.props.availability ? 'Available' : 'Unavailable'}</span></p>
    </Card>
  );
}

export default Album;

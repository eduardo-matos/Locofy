import React from 'react';
import { mount } from 'enzyme';
import Artist from './';
import { DEFAULT_IMAGE } from '../../../config';

describe('Artist', () => {
  const props = {
    id: '2cFrymmkijnjDg9SS92EPM',
    name: 'Blackbear',
    image: 'https://i.scdn.co/image/77279b90326fad960f89953505d6abc55285c618',
    genres: ['pop', 'rock'],
    popularity: 81,
  };

  it('Formats result correctly', () => {
    const artist = mount(<Artist {...props} />);

    expect(artist.find('img').prop('src')).toEqual(props.image);
    expect(artist.find('Card').prop('title')).toEqual(props.name);
    expect(artist.find('Popularity').prop('value')).toEqual(props.popularity);

    const actualGenres = artist.find('Chip').map(node => node.text());
    expect(actualGenres).toEqual(props.genres);
  });

  it('Shows placeholder image if there artist result brings no image', () => {
    const artist = mount(<Artist {...props} image={null} />);
    expect(artist.find('img').prop('src')).toEqual(DEFAULT_IMAGE);
  });
});

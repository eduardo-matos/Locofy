import React from 'react';
import { mount } from 'enzyme';
import Album from './';

describe('Album', () => {
  const props = {
    id: '3A4zAmE5c4dUAAqEJz6hCH',
    image: 'https://i.scdn.co/image/1e886ca74a1dc17b9a226283b9cc4b765ee25cb8',
    name: 'Black Album',
    artists: ['Metallica'],
    availability: true,
  };

  it('Formats result correctly', () => {
    const album = mount(<Album {...props} />);

    expect(album.find('img').prop('src')).toEqual(props.image);
    expect(album.find('Card').prop('title')).toEqual(props.name);
    expect(album.find('.album-artist-name').text()).toEqual(props.artists[0]);
    expect(album.find('.album-availability').text()).toEqual('Available');
  });

  it('Displays "various artists" if album has more than one artist', () => {
    const album = mount(<Album {...props} artists={['Faustão', 'Sérgio Mallandro']} />);
    expect(album.find('.album-artist-name').text()).toEqual('Various Artists');
  });

  it('Shows unavailability', () => {
    const album = mount(<Album {...props} availability={false} />);
    expect(album.find('.album-availability').text()).toEqual('Unavailable');
  });
});

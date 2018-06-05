import React from 'react';
import { mount } from 'enzyme';
import Track from './';

describe('Track', () => {
  const props = {
    name: 'Back In Black',
    image: 'https://i.scdn.co/image/52d83377fe9d7fc838deeb859499f3973adf903f',
    duration_ms: 183493,
    album: 'Back In Black',
    artists: ['AC/DC', 'Dr. Sin'],
  };

  it('Formats result correctly', () => {
    const track = mount(<Track {...props} />);

    expect(track.find('img').prop('src')).toEqual(props.image);
    expect(track.find('Card').prop('title')).toEqual(props.name);
    expect(track.find('.track-artists').text()).toEqual(props.artists.join(', '));
    expect(track.find('.track-album').text()).toEqual(props.album);
    expect(track.find('.track-duration').text()).toEqual('3:03');
  });
});

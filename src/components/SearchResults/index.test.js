import React from 'react';
import { mount } from 'enzyme';
import SearchResults from './';
import context from '../../__mocks__/context';
import fixtures from './fixtures';

describe('SearchResults', () => {
  beforeEach(() => {
    context.state.isLoggedIn = true;
  });

  it('Shows no content if results is empty', () => {
    const sr = mount(<SearchResults />);

    expect(sr.text()).toEqual('No results');
    expect(sr.find('Artist')).toHaveLength(0);
    expect(sr.find('Album')).toHaveLength(0);
    expect(sr.find('Track')).toHaveLength(0);
  });

  it('Shows loading icon if context is loading results', () => {
    context.state.isLoadingResults = true;
    const sr = mount(<SearchResults />);

    expect(sr.find('Preloader')).toHaveLength(1);
    expect(sr.text()).toEqual('');
    expect(sr.find('Artist')).toHaveLength(0);
    expect(sr.find('Album')).toHaveLength(0);
    expect(sr.find('Track')).toHaveLength(0);
  });

  describe('Show one type ata time', () => {
    it('Show only "Artist" component if type is artist', () => {
      context.state.type = 'artist';
      context.state.results = fixtures.artists;

      const sr = mount(<SearchResults />);
      expect(sr.find('Artist')).toHaveLength(fixtures.artists.length);
      expect(sr.find('Album')).toHaveLength(0);
      expect(sr.find('Track')).toHaveLength(0);

      // Make sure all props are passed
      fixtures.artists.forEach((artist, i) => {
        expect(sr.find('Artist').at(i).props()).toEqual(artist);
      });
    });

    it('Show only "Album" component if type is album', () => {
      context.state.type = 'album';
      context.state.results = fixtures.albums;

      const sr = mount(<SearchResults />);
      expect(sr.find('Artist')).toHaveLength(0);
      expect(sr.find('Album')).toHaveLength(fixtures.albums.length);
      expect(sr.find('Track')).toHaveLength(0);

      // Make sure all props are passed
      fixtures.albums.forEach((album, i) => {
        expect(sr.find('Album').at(i).props()).toEqual(album);
      });
    });

    it('Show only "Track" component if type is track', () => {
      context.state.type = 'track';
      context.state.results = fixtures.tracks;

      const sr = mount(<SearchResults />);
      expect(sr.find('Artist')).toHaveLength(0);
      expect(sr.find('Album')).toHaveLength(0);
      expect(sr.find('Track')).toHaveLength(fixtures.tracks.length);

      // Make sure all props are passed
      fixtures.tracks.forEach((track, i) => {
        expect(sr.find('Track').at(i).props()).toEqual(track);
      });
    });
  });
});

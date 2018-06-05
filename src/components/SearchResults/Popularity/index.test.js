import React from 'react';
import { mount } from 'enzyme';
import Popularity from './';

describe('Popularity', () => {
  it('Hot', () => {
    for (let value of range(80, 100)) {
      const p = mount(<Popularity value={value} />)

      expect(p.text()).toEqual('hot');
      expect(p.find('.hot')).toHaveLength(1);
    }
  });

  it('Cool', () => {
    for (let value of range(60, 79)) {
      const p = mount(<Popularity value={value} />)

      expect(p.text()).toEqual('cool');
      expect(p.find('.cool')).toHaveLength(1);
    }
  });

  it('Regular', () => {
    for (let value of range(30, 59)) {
      const p = mount(<Popularity value={value} />)

      expect(p.text()).toEqual('regular');
      expect(p.find('.regular')).toHaveLength(1);
    }
  });

  it('Underground', () => {
    for (let value of range(0, 29)) {
      const p = mount(<Popularity value={value} />)

      expect(p.text()).toEqual('underground');
      expect(p.find('.underground')).toHaveLength(1);
    }
  });
});

function* range(from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

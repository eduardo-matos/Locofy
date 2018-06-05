import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Popularity.css';

function translatePopulatity(popularity) {
  if (popularity >= 80) {
    return 'hot';
  } else if (popularity >= 60) {
    return 'cool';
  } else if (popularity >= 30) {
    return 'regular';
  }

  return 'underground';
}

function Popularity({ value }) {
  const translatedValue = translatePopulatity(value);

  return (
    <div>
      <span
        className={cx('result-popularity', translatedValue)}
      >
        {translatedValue}
      </span>
    </div>
  );
}

Popularity.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Popularity;

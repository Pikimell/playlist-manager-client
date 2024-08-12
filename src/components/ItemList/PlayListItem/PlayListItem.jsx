import PropTypes from 'prop-types';
import style from './PlayListItem.module.css';
import { useState } from 'react';
import { Card, Flex } from 'antd';

const PlayListItem = ({ data = {} }) => {
  const {
    id,
    name,
    owner,
    primary_color,
    public: isPublic,
    tracks,
    images,
  } = data;

  return (
    <Flex className={style.item}>
      <div className={style.imageWrapper}>
        <img src={images[0].url} alt={name} />
      </div>

      <p className={style.title}>{name}</p>
      <p className={style.count}>Tracks: {tracks.total}</p>
    </Flex>
  );
};

export default PlayListItem;

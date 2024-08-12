import style from './PlayListItem.module.css';
import { useState } from 'react';
import { Flex } from 'antd';

const PlayListItem = ({ data = {}, addItem, removeItem }) => {
  const [isActive, setActive] = useState(false);

  const { id, name, owner, public: isPublic, tracks, images } = data;

  const handleChangeActive = () => {
    setActive(!isActive);

    if (!isActive) addItem(data);
    else removeItem(data);
  };

  return (
    <Flex
      className={style.item + ` ${isActive ? style.active : ''}`}
      onClick={handleChangeActive}
    >
      <div className={style.imageWrapper}>
        <img src={images[0].url} alt={name} />
      </div>

      <p className={style.title}>{name}</p>
      <p className={style.count}>Owner: {owner.display_name}</p>
      <p className={style.count}>Tracks: {tracks.total}</p>
    </Flex>
  );
};

export default PlayListItem;

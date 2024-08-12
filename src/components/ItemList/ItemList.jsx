import style from './ItemList.module.css';
import { Flex } from 'antd';
import PlayListItem from './PlayListItem/PlayListItem.jsx';

const ItemList = ({ items = [] }) => {
  console.log(items.slice(0, 3));
  return (
    <Flex className={style.list}>
      {items.map(item => {
        return <PlayListItem key={item.id} data={item} />;
      })}
    </Flex>
  );
};

export default ItemList;

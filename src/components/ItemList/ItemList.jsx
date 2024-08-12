import style from './ItemList.module.css';
import { Button, Flex, Input } from 'antd';
import PlayListItem from './PlayListItem/PlayListItem.jsx';
import { useState } from 'react';

const ItemList = ({ items = [] }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputFilter, setInputFilter] = useState('');

  const totalTrack = selectedItems.reduce(
    (sum, el) => sum + el.tracks.total,
    0,
  );

  const addItem = item => {
    setSelectedItems([...selectedItems, item]);
    console.log('Add');
  };
  const removeItem = item => {
    const copy = selectedItems.filter(el => el.id !== item.id);
    setSelectedItems(copy);
  };

  const onChange = value => {
    setInputFilter(value);
  };

  const filteredItems = items.filter(el => {
    const query = inputFilter.toLowerCase();
    const isValidName = el.name.toLowerCase().includes(query);
    const isValidAuthor = el.owner.display_name.toLowerCase().includes(query);
    return isValidName || isValidAuthor;
  });

  return (
    <Flex className={style.container}>
      <Flex className={style.list}>
        {filteredItems.map(item => {
          return (
            <PlayListItem
              key={item.id}
              data={item}
              addItem={addItem}
              removeItem={removeItem}
            />
          );
        })}
      </Flex>

      <Flex className={style.options}>
        <Input value={inputFilter} onChange={e => onChange(e.target.value)} />
        <hr />
        <p>Selected: {selectedItems.length}</p>
        <p>Total tracks: {totalTrack}</p>
        <Button>Transfer</Button>
        <Button>Clear</Button>
      </Flex>
    </Flex>
  );
};

export default ItemList;

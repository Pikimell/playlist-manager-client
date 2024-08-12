import style from './PlayListPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayList } from '../../redux/spotify/operations.js';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemList from '../../components/ItemList/ItemList.jsx';
import { selectItems } from '../../redux/spotify/selectors.js';

const PlayListPage = ({}) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('access_token');
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  useEffect(() => {
    dispatch(fetchPlayList(token));
  }, []);

  return (
    <div>
      <ItemList items={items} />
    </div>
  );
};

export default PlayListPage;

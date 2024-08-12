import style from './PlayListPage.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlayList } from '../../redux/spotify/operations.js';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemList from '../../components/ItemList/ItemList.jsx';

const PlayListPage = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('access_token');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayList(token));
  }, []);

  return (
    <div>
      <ItemList items={[]} />
    </div>
  );
};

export default PlayListPage;

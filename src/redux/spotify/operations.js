import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlayList = createAsyncThunk(
  'spotify/fetchPlayList',
  async (token, thunkAPI) => {
    const BASE_URL = 'https://api.spotify.com/v1';
    const END_POINT = '/me/playlists?limit=50';
    const url = BASE_URL + END_POINT;

    try {
      const result = new Promise((resolve, reject) => {
        getAllDataRecursively(url, [], resolve, reject, token);
      });
      const data = await result;
      console.log('ITEMS', data);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

async function getAllDataRecursively(url, items, resolve, reject, accessToken) {
  const headers = { Authorization: 'Bearer ' + accessToken };
  axios
    .get(url, { headers })
    .then(({ data: response }) => {
      const retrievedData = items.concat(response.items);
      if (response.next !== null) {
        getAllDataRecursively(
          response.next,
          retrievedData,
          resolve,
          reject,
          accessToken,
        );
      } else {
        resolve(retrievedData);
      }
    })
    .catch(error => {
      console.log(error);
      reject('Something wrong. Please refresh the page and try again.');
    });
}

export const fetchSongs = async (listOfPlayListIDs, token) => {
  let accessToken = token.access_token;

  const listOfPlayListIDsArray = Array.from(listOfPlayListIDs);
  const getPlaylistURLs = listOfPlayListIDsArray
    .filter(id => id !== 'allthelikedsongsid')
    .map(id => {
      return baseSpotifyAPI + '/playlists/' + id + '/tracks?limit=50';
    });

  const playlistPromises = getPlaylistURLs.map(
    url =>
      new Promise((resolve, reject) => {
        fetchSongsInfosInASinglePlaylistRecursively(
          url,
          [],
          accessToken,
          resolve,
          reject,
        );
      }),
  );

  return Promise.all(playlistPromises);
};

export function fetchSongsInfosInASinglePlaylistRecursively(
  url,
  compiledData,
  accessToken,
  resolve,
  reject,
) {
  console.log(url);
  fetch(url, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then(response => response.json())
    .then(response => {
      let newData = [];
      response.items.forEach(data => {
        let cur = {};
        if (data.track !== null) {
          cur['trackName'] = extractSongName(data.track.name);
          cur['artistName'] = [];
          data.track.artists.forEach(artist => {
            cur['artistName'].push(artist.name);
          });
          cur['albumName'] = data.track.album.name;
          cur['albumArtist'] = [];
          data.track.album.artists.forEach(artist => {
            cur['albumArtist'].push(artist.name);
          });
          newData.push(cur);
        }
      });
      const retrievedData = compiledData.concat(newData);
      if (response.next !== null) {
        fetchSongsInfosInASinglePlaylistRecursively(
          response.next,
          retrievedData,
          accessToken,
          resolve,
          reject,
        );
      } else {
        var finalRES = {};
        finalRES[url.split('/')[5]] = retrievedData;
        resolve(finalRES);
      }
    })
    .catch(error => {
      console.log(error);
      reject('Something wrong. Please refresh the page and try again.');
    });
}

export function extractSongName(str) {
  if (str.includes('(feat. ')) {
    return str.substring(0, str.indexOf('(feat. '));
  } else if (str.includes('(Feat. ')) {
    return str.substring(0, str.indexOf('(Feat. '));
  } else if (str.includes('(with ')) {
    return str.substring(0, str.indexOf('(with '));
  }
  return str;
}

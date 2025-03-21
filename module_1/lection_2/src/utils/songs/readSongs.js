import fs from 'node:fs/promises';
import { SONG_DB_PATH } from '../../constants/songs.js';

export const readSongs = async () => {
  // const buffer = await fs.readFile(SONG_DB_PATH);
  // const text = buffer.toString();
  // console.log(buffer);
  // console.log(text);
  // -------------------
  const data = await fs.readFile(SONG_DB_PATH, 'utf-8');
  // console.log(data);
  // console.log(typeof data); // string

  return JSON.parse(data);
};

readSongs();

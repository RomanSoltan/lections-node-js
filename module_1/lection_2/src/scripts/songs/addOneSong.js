import { createFakeSong } from '../../utils/songs/createFakeSong.js';
import { readSongs } from '../../utils/songs/readSongs.js';
import { writeSongs } from '../../utils/songs/writeSongs.js';

const addOneSong = async () => {
  // читаємо всі пісні
  const songList = await readSongs();
  // створюємо нову пісню
  const newSong = createFakeSong();
  // перезаписуємо всі пісні
  await writeSongs([...songList, newSong]);
};

addOneSong();

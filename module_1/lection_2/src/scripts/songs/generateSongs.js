import { createFakeSong } from '../../utils/songs/createFakeSong.js';
import { readSongs } from '../../utils/songs/readSongs.js';
import { writeSongs } from '../../utils/songs/writeSongs.js';

export const generateSongs = async (number) => {
  const songList = await readSongs();
  const newSongs = Array(number)
    .fill(0) // потрібно заповнити масив чимось(не empty), щоб спрацював map
    .map(createFakeSong); //оскільки createFakeSong без аргументів, то можливий такий запис
  // console.log([...songList, ...newSongs]);
  await writeSongs([...songList, ...newSongs]);

  // const songList = [];
  // for (let i = 0; i < 5; i += 1) {
  //   songList.push(createFakeSong());
  // }
  // console.log(songList);
};

generateSongs(5);

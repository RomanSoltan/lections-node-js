import { createFakeSong } from '../../utils/songs/createFakeSong.js';
import { readSongs } from '../../utils/songs/readSongs.js';

const generateSongs = async (number) => {
  const songList = Array(number)
    .fill(0) // потрібно заповнити масив чимось(не empty), щоб спрацював map
    .map(createFakeSong); //оскільки createFakeSong без аргументів, то можливий такий запис

  // const songList = [];
  // for (let i = 0; i < 5; i += 1) {
  //   songList.push(createFakeSong());
  // }
  console.log(songList);
};

generateSongs(5);

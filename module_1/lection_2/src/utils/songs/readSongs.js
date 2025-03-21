import fs from 'node:fs';
console.log(fs);

export const readSongs = async () => {
  fs.readFile('../../db/db-songs.json', (error, data) => {
    console.log(error);
    console.log(data);
  });
};

readSongs();

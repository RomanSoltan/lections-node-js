import multer from 'multer';
import { TEMPORARY_FILE_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  // куди зберігаємо тимчасово файл
  destination: function (req, file, cb) {
    cb(null, TEMPORARY_FILE_DIR);
  },
  // те, як буде формуватися імя файлу
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export const upload = multer({ storage });

import path from 'node:path';

export const sortList = ['asc', 'desc'];

// створимо змінну, де зберігається шлях до папки з шаблоном
export const TEMPLATES_DIR = path.resolve('src', 'templates');

export const TEMPORARY_FILE_DIR = path.resolve('temp');

export const UPLOAD_FILE_DIR = path.resolve('upload');

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');

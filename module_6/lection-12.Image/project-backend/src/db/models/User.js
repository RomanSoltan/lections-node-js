import { Schema, model } from 'mongoose';
import { handlerSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/auth.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'User must be exist'],
    },
    email: {
      type: String,
      // regex
      match: emailRegexp,
      // унікальність на рівні колекції, а не всієї бази.
      // Команда для бази створити унікальний індекс
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

// коли при збереженні сталася помилка
userSchema.post('save', handlerSaveError);

// Перед оновленням викличи колбек функцію
userSchema.pre('findOneAndUpdate', setUpdateSettings);

// якщо під час оновлення сталася валідація, теж викличи цю функцію
userSchema.post('findOneAndUpdate', handlerSaveError);

const UserCollection = model('user', userSchema);

export default UserCollection;

import { Schema, model } from 'mongoose';
import { handlerSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/auth.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // regex
      match: emailRegexp,
      // унікальність на рівні колекції, а не всієї бази
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handlerSaveError);
userSchema.post('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handlerSaveError);

const UserCollection = model('user', userSchema);

export default UserCollection;

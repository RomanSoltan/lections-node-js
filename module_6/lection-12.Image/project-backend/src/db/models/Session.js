import { Schema, model } from 'mongoose';
import { handlerSaveError, setUpdateSettings } from './hooks.js';

const sessionSchema = new Schema(
  {
    // вказує кому належить сесія
    userId: {
      // з точки зору MongoDB, id - це окремий тип даних, якого немає в JS
      type: Schema.Types.ObjectId,
      // назва колекції, з якої береться id
      ref: 'users',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    // час життя токену
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

sessionSchema.post('save', handlerSaveError);
sessionSchema.pre('findOneAndUpdate', setUpdateSettings);
sessionSchema.post('findOneAndUpdate', handlerSaveError);

const SessionCollection = model('session', sessionSchema);

export default SessionCollection;

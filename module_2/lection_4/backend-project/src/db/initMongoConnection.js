import mongoose from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.js';

// функція, як підключається до бази данних
export const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const password = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const database = getEnvVar('MONGODB_DB');
    // 1. потрібно передати рядок підключення до конкретної бази
    // 2. після останнього слеша і перед знаком питання обовязково
    // потрібно передати назву бази, до якої потрібно підключитись
    // 3. якщо цього не зробити помилки не буде, просто mongoose сам
    // створить базу, яку назве test, і до неї підключиться
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${database}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Successfully connection to database');
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

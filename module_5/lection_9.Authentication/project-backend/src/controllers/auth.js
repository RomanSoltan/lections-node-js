import { registerUser } from '../services/auth.js';

export const registerController = async (req, res) => {
  // в сервіс передаємо обєкт
  await registerUser(req.body);

  // якщо все добре - буде повідомлення,
  // якщо ні - викинеться помилка, яку спіймає ctrlWrapper
  res.json({
    message: 'Successully registrer user!',
  });
};

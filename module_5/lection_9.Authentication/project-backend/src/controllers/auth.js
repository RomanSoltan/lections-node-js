import { registerUser, loginUser } from '../services/auth.js';

export const registerController = async (req, res) => {
  // в сервіс передаємо обєкт
  await registerUser(req.body);

  // якщо все добре - буде повідомлення,
  // якщо ні - викинеться помилка, яку спіймає ctrlWrapper
  res.status(201).json({
    status: 201,
    message: 'Successully registrer user!',
  });
};

export const loginController = async (req, res) => {
  // робимо login через session
  // передамо в сервіс req.body
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Login successfuly',
    data: {
      accessToken: session.accessToken,
    },
  });
};

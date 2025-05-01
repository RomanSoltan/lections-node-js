import {
  registerUser,
  verifyUser,
  loginUser,
  refreshUser,
  logoutUser,
} from '../services/auth.js';

// функція для збереження куків
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

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

export const verifyController = async (req, res) => {
  // беремо jwt token із адреси і передаємо в сервіс
  await verifyUser(req.query.token);

  res.json({
    message: 'Email verified!',
  });
};

export const loginController = async (req, res) => {
  // робимо login через session
  // передамо в сервіс req.body
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Login successfuly',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  // зберігається refreshToken
  // console.log(req.cookies);

  const session = await refreshUser(req.cookies);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Session successfully refresh',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    // запит на логаут
    await logoutUser(req.cookies.sessionId);
  }

  // прибрали куки
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        // завчасне переривання, щоб було видно всі тексти помилок
        abortEarly: false,
      });
      next();
    } catch (error) {
      next(createHttpError(400, error.message));
    }
  };

  return func;
};

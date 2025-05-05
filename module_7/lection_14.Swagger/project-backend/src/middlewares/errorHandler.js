export const errorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  // console.log('errorHandler---', err);

  res.status(status).json({
    status,
    message,
  });
};

export const handlerSaveError = (error, doc, next) => {
  error.status = 400;
  next();
};

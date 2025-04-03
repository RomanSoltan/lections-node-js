// Декоратор - це функція, яка отримує іншу функцію, обгортає її чимось
// і повертає функцію обгорнуту в якусь іншу логіку(обгортку)

export const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      // передається в обробник помилок з 4-ма параметрами errorHandler
      next(error);
    }
  };
  return func;
};

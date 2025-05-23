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

// Замість того, щоб в кожному catch передавати відповідь з помилкою,
// можна помилку передати в next() і тоді express буде шукати обробник
// помилок, обробником помилок express вважає middleware, і якому є
// 4 параметри, де викликає функцію, куди першим аргументом передає помилку

const parseNumber = (value, defaultValue) => {
  // значення value повинно бути рядком
  if (typeof value !== 'string') return defaultValue;

  // перетвореня значення value у ціле число
  const parsedValue = parseInt(value);
  if (Number.isNaN(parsedValue)) return defaultValue;

  return parsedValue;
};

export const parsePaginationParams = ({ page, perPage }) => {
  // перетвори мені page на число, якщо page немає або не можна
  // перетворити на число, поверни значення за замовчуванням
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

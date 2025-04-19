import bcrypt, { genSalt } from "bcrypt";

const hashPassword = async (password) => {
  // щоб побачити сіль
  // const salt = await bcrypt.genSalt(10);
  // console.log(salt);

  // хешуємо пароль
  const result = await bcrypt.hash(password, 10);
  // console.log(result);

  // compare() порівнює пароль який передав користувач під час логіну
  // із захешованим паролем із бази, який був створений під час реєстрації.
  // повертає true або false
  const compareResult1 = await bcrypt.compare(password, result);
  console.log(compareResult1);

  const compareResult2 = await bcrypt.compare("123457", result);
  console.log(compareResult2);
};
hashPassword("123456");

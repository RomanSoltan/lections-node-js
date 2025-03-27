import express from "express";

//  створимо порожній сервер
const app = express(); // app - web-server

// додамо інструкції
app.get("/", (req, res) => {
  // - req - обєкт request містить вю інфо про запит
  // (заголовки, тіло, парамери...)
  // - res - обєкт, який дозволяє налаштувати і відправити
  // відповідь а фронтенд

  res.send("<h1>Home Page</h1>");
});

app.get("/contacts", (req, res) => {
  res.send("<h1>Contacts Page</h1>");
  console.log(req.method);
  console.log(req.url);

  console.log("After send response");
});

// запускаємо сервер на порті 3000
app.listen(3000, () => {
  // у разі успішного запуску
  console.log("Server successfully run on 3000 port");
});

// Щоб сервер міг приймати запити і нaдсилати відповіді,
// ми маємо вказати серверу на які адреси має прийти запит
// і що треба робити, тоді він зможе обробити цей запит

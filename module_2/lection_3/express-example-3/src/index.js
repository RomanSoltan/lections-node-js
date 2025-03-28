import express from "express";
import cors from "cors";
import PinoHttp from "pino-http";

import movies from "./db/movies.js";

const app = express();

app.use(cors());

// const logger = PinoHttp({
//   transport: {
//     target: "pino-pretty",
//   },
// });

// app.use(logger);

// // цей middleware спрацьовує для будь-якого запиту і дозволяє крос-доменні запити, змінюючи заголовок. Але так уже не пишуть
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

// add middleware
// перший аргумент або адреса або функція
//  - якщо передаємо адресу, то це означає, що цей middleware
// буде стосуватися лише цієї групи адрес
// app.use("/movies");
// ----------------------

//  - якщо функцію, то це означатиме що middleware
// стосуватиметься будь-якого запиту
app.use((req, res, next) => {
  console.log("First middleware");
  // каже express, що це ще не кінець, треба йти далі по коду
  next();
});
app.use((req, res, next) => {
  console.log("Second middleware");
  // каже express, що це ще не кінець, треба йти далі по коду
  next();
});

// create routes
app.get("/products", (req, res) => {
  res.json([]);
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.listen(3000, () => console.log("server running on 3000 port"));

// middleware - це проміжий обробник, коли певна задача вимагає кілька етапів обробки. Бувають глобальні і локальні middleware

// Основий принцип express обробки middleware:
// - коли приходить запит певного методу на певну адресу, express
// послідовно перевіряє всі записи в тому порядку, в якому вони
// написані у коді, коли знаходить перший потрібний middleware,
// то виконує функцію, яка прописана у ньому і далі express
// зупиняє пошук

import express from "express";
import movies from "./db/movies.js";

const app = express();

// додаткові налаштуваня
app.set("json spaces", 8);

app.get("/movies", (req, res) => {
  const databaseRes = null;

  // може обробляти null
  // res.json(databaseRes);

  // не може обробляти null
  // res.send(databaseRes);

  res.json(movies);
  // res.send(movies);
});

app.listen(3000, () => {
  console.log("server run on 3000 port");
});

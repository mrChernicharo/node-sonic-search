const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();

app.post("/pages", (req, res) => {
  const { title, content } = req.body;

  return res.status(202).send();
});

app.get("/search", (req, res) => {
  //busca registros
  return res.json([]);
});

app.get("/suggest", (req, res) => {
  return res.json([]);
});

app.listen(3333);

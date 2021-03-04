const express = require("express");

const app = express();

app.post("/pages", (req, res) => {
  // Salvar no banco
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

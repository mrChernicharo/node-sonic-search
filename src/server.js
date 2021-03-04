const express = require("express");
const { v4: uuid } = require("uuid");
const { Ingest } = require("sonic-channel");

const app = express();

const sonicChannelIngest = new Ingest({
  host: "localhost",
  port: 1491,
  auth: "superSecretPassword",
});

sonicChannelIngest.connect({
  connected: () => {
    console.log("conectou");
  },
});

app.post("/pages", (req, res) => {
  const { title, content } = req.body;
  const id = uuid();

  // cadastrar página no banco ...

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

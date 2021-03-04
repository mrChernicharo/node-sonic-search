const express = require("express");

const app = express();

app.post("/pages", (req, res) => {
  // Salvar no banco

  return res.status(202).send();
});

app.listen(3333);

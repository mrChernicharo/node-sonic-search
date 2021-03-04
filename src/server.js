const express = require("express");
const { v4: uuid } = require("uuid");
const { Ingest } = require("sonic-channel");

const app = express();

const sonicChannelIngest = new Ingest({
  // host: "localhost", <- não funciona pois meu docker roda por default nesse TCP aqui 192.168.99.100
  host: "192.168.99.100",
  //port: 2376
  port: 1491,
  auth: "SecretPassword", // <- não adianta mudar lá no sonic.cfg, a senha tem q ser essa
});

sonicChannelIngest.connect({
  connected: () => {
    console.log("conectou");
  },
  timeout: () => {
    console.log("timeout");
  },
  error: (e) => {
    console.warn("erro!");
    console.warn(e);
  },
  disconnected: () => {
    console.log("disconnected");
  },
});

app.post("/pages", async (req, res) => {
  const { title, content } = req.body;
  const id = uuid();

  console.log(title, content, id);

  // cadastrar página no banco ...
  await sonicChannelIngest.push(
    "pages",
    "default",
    `page:${id}`,
    `${title} ${content}`,
    {
      lang: "por",
    }
  );
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

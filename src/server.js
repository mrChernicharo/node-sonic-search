const express = require("express");
const { v4: uuid } = require("uuid");
const { Ingest } = require("sonic-channel");

const app = express();
app.use(express.json());

const sonicChannelIngest = new Ingest({
  // host: "localhost", // <- não funciona pois meu docker roda por default nesse TCP aqui 192.168.99.100
  //port: 2376
  host: "192.168.99.100",
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

app.post("/pages", (req, res) => {
  console.log("cria registros");
  try {
    const { title, content } = req.body;
    const id = uuid();

    console.log(req.body);

    // cadastrar página no banco ...
    sonicChannelIngest
      .push("default", "pages", `page:${id}`, `${title} ${content}`, {
        lang: "por",
      })
      .finally((e) => console.log(e));

    return res.status(201).send();
    //
  } catch (e) {
    console.log(e);

    return res.status(500).send();
  }
});

app.get("/search", (req, res) => {
  console.log("busca registros");
  return res.json([]);
});

app.get("/suggest", (req, res) => {
  return res.json([]);
});

app.get("/pages", (req, res) => {
  return res.json([]);
});

app.listen(3333);

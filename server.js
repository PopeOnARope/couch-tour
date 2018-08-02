const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.get("/api/shows", (req, res) => {
  debugger;
  const _res = req.items.artists.map(artist =>
    fetch(
      `https://rest.bandsintown.com/artists/${name}/events?app_id=5edfb100a7e4e77bd4658d1184623cbf`
    )
  );
  // console.log(_res);
  res.send({ foo: "bar" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

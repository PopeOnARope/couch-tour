const express = require("express");
const fetch = require("node-fetch");

const app = express();
const querystring = require("querystring");
const port = process.env.PORT || 5000;
const utils = require("./utils");

const {
  getConfig,
  getDistanceFromLatLonInKm,
  formatStringForQuery,
  getShows,
  filterShows,
  getUserData
} = utils;
const bodyParser = require("body-parser");

// const CLIENT_ID = "d3250185fb0f43419c877be2d8e64b86";

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

// if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
// }

console.log(process.env);

let redirect_uri = process.env.REDIRECT_URI || "http://localhost:5000/callback";

app.get("/login", function(req, res) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: "user-read-private user-read-email",
        redirect_uri
      })
  );
});

app.get("/callback", function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64")
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || "http://localhost:3000";
    res.redirect(uri + "?access_token=" + access_token);
  });
});

app.post("/api/shows", async (req, res) => {
  const spoConfig = getConfig(req.body.accessToken);
  const { position } = req.body;
  console.log(req.body.accessToken);
  try {
    const USER_URL = "https://api.spotify.com/v1/me?";
    const ARTIST_URL =
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=1000&offset=0";
    const userData = await fetch(USER_URL, spoConfig);
    const parsedUserData = await userData.json();

    const artists = await fetch(ARTIST_URL, spoConfig);
    const parsedArtists = await artists.json();
    let shows = getShows(parsedArtists.items);
    shows = await Promise.all(shows);

    const filteredShows = filterShows(shows, position);

    res.send({
      shows: filteredShows,
      user: parsedUserData,
      artists: parsedArtists
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/api/similarshows", async (req, res) => {
  try {
    const { accessToken, position } = req.body;
    const spoConfig = getConfig(accessToken);
    const ARTIST_URL = `https://api.spotify.com/v1/artists/${
      req.body.id
    }/related-artists`;

    const artists = await fetch(ARTIST_URL, spoConfig);
    const parsedArtists = await artists.json();

    let shows = getShows(parsedArtists.artists);
    shows = await Promise.all(shows);
    const filteredShows = filterShows(shows, position);
    res.send({
      shows: filteredShows
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

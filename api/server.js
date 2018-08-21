const express = require("express");
const fetch = require("node-fetch");

const app = express();
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

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post("/api/shows", async (req, res) => {
  const spoConfig = getConfig(req.body.accessToken);
  const { position } = req.body;

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

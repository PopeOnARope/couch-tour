const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 5000;
const utils = require("./utils");

const { getConfig, getDistanceFromLatLonInKm, formatStringForQuery } = utils;

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

const getUserData = async config => {
  const USER_URL = "https://api.spotify.com/v1/me?";
  const userData = await fetch(USER_URL, config);
  const parsedUserData = await userData.json();
  return parsedUserData;
};

app.post("/api/shows", async (req, res) => {
  const spoConfig = getConfig(req.body.accessToken);
  const { position } = req.body;

  try {
    const USER_URL = "https://api.spotify.com/v1/me?";
    const ARTIST_URL =
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=1000&offset=0";
    const userData = await fetch(USER_URL, spoConfig);
    const parsedUserData = await userData.json();

    const artists = await fetch(ARTIST_URL, spoConfig);
    const parsedArtists = await artists.json();
    const shows = parsedArtists.items.map(async artist => {
      const fetchedArtist = await fetch(
        `https://rest.bandsintown.com/artists/${formatStringForQuery(
          artist.name
        )}?app_id=5edfb100a7e4e77bd4658d1184623cbf`
      );
      const parsedArtist = await fetchedArtist.json();
      if (parsedArtist && parsedArtist.name) {
        const show = await fetch(
          `https://rest.bandsintown.com/artists/${formatStringForQuery(
            artist.name
          )}/events?app_id=5edfb100a7e4e77bd4658d1184623cbf`
        );
        let parsedShow = await show.json();
        parsedShow = parsedShow.map(show => ({
          ...show,
          image_url: parsedArtist.image_url
        }));
        return parsedShow;
      }
      return {};
    });
    const completedShows = await Promise.all(shows);
    const flattenedShows = completedShows.reduce(
      (acc, val) => acc.concat(val),
      []
    );

    const filteredShows = flattenedShows
      .map(show => ({
        ...show,
        distance: getDistanceFromLatLonInKm(show, position)
      }))
      .filter((show, idx, arr) => {
        return (
          show.venue &&
          show.distance < 1000 &&
          (arr[idx - 1].venue && show.venue.name !== arr[idx - 1].venue.name)
        );
      });

    filteredShows.sort((a, b) => {
      getDistanceFromLatLonInKm(a, position) -
        getDistanceFromLatLonInKm(b, position);
    });

    filteredShows.forEach(show => {
      console.log(getDistanceFromLatLonInKm(show, position));
    });

    res.send({ shows: filteredShows, user: parsedUserData });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

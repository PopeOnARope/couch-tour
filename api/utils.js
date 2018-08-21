const fetch = require("node-fetch");

const getDistanceFromLatLonInKm = (event, position) => {
  if (!event || !event.venue) {
    return 10000000;
  }
  const lat1 = event.venue.latitude;
  const lon1 = event.venue.longitude;
  const lat2 = position.latitude;
  const lon2 = position.longitude;
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports.getDistanceFromLatLonInKm = getDistanceFromLatLonInKm;

const formatStringForQuery = string =>
  string
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(/\W/g, "")
    .toLowerCase();

module.exports.formatStringForQuery = formatStringForQuery;

module.exports.getConfig = token => ({
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  },
  mode: "cors",
  cache: "default"
});

module.exports.getShows = arr =>
  arr.map(async artist => {
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

module.exports.filterShows = (shows, position) => {
  console.log(shows);
  let _shows = shows
    .reduce((acc, val) => acc.concat(val), [])
    .map(show => ({
      ...show,
      distance: getDistanceFromLatLonInKm(show, position)
    }))
    .filter((show, idx, arr) => {
      return (
        show &&
        show.venue &&
        show.distance < 500 &&
        (arr[idx - 1] &&
          arr[idx - 1].venue &&
          show.venue.name !== arr[idx - 1].venue.name)
      );
    });
  console.log(_shows);

  _shows.sort((a, b) => {
    getDistanceFromLatLonInKm(a, position) -
      getDistanceFromLatLonInKm(b, position);
  });
  return _shows;
};

module.exports.getUserData = async config => {
  const USER_URL = "https://api.spotify.com/v1/me?";
  const userData = await fetch(USER_URL, config);
  const parsedUserData = await userData.json();
  return parsedUserData;
};

module.exports.getDistanceFromLatLonInKm = (event, position) => {
  const lat1 = event.venue.latitude;
  const lon1 = event.venue.longitude;
  const lat2 = position.latitude;
  const lon2 = position.longitude;
  console.log(lat1, lat2, lon1, lon2);
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

module.exports.formatStringForQuery = string =>
  string
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(/\W/g, "")
    .toLowerCase();

module.exports.getConfig = token => ({
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  },
  mode: "cors",
  cache: "default"
});

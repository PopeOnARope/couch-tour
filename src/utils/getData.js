export const getData = () => {
  const BASE_URL = "https://api.spotify.com/v1/me?";
  const FETCH_URL = BASE_URL;
  const location = window.location.href;
  const accessToken = location.slice(location.indexOf("token=") + 6);

  var myOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    },
    mode: "cors",
    cache: "default"
  };

  fetch(BASE_URL, myOptions)
    .then(response => response.json())
    .then(json => json);
};

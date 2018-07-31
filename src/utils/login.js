function login(callback) {
  var CLIENT_ID = "d3250185fb0f43419c877be2d8e64b86";
  var REDIRECT_URI = "http://localhost:3000/callback";
  function getLoginURL(scopes) {
    return (
      "https://accounts.spotify.com/authorize?client_id=" +
      CLIENT_ID +
      "&redirect_uri=" +
      encodeURIComponent(REDIRECT_URI) +
      "&scope=" +
      encodeURIComponent(scopes.join(" ")) +
      "&response_type=token"
    );
  }

  var url = getLoginURL(["user-read-email", "user-top-read"]);

  var width = 450,
    height = 730,
    left = window.innerWidth / 2 - width / 2,
    top = window.innerHeight / 2 - height / 2;

  window.addEventListener(
    "message",
    function(event) {
      var hash = JSON.parse(event.data);
      if (hash.type == "access_token") {
        debugger;
        console.log(hash.access_token);
        callback(hash.access_token);
      }
    },
    false
  );

  window.location = url;
}

function getUserData(accessToken) {
  return new XMLHttpRequest({
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
}

export const authorizeSpotify = callback => {
  login(function(accessToken) {
    alert(accessToken);
    console.log(accessToken);
    getUserData(accessToken).then(function(response) {
      console.log(response);
      callback(response);
    });
  });
};

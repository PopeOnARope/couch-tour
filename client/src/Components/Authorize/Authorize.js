import React from "react";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import { authorizeSpotify } from "../../utils/login";
import { connect } from "react-redux";
import { setUserData } from "../../redux/reducers";

const getShows = async args => {
  console.log(args);
  const response = await fetch("/api/shows", { method: "GET", body: args });
  const body = await response.json();

  console.log(body);
  if (response.status !== 200) throw Error(body.message);
  return body;
};

const getData = callback => {
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

  fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => {
      callback(json);
    });
};

const getArtists = callback => {
  const BASE_URL =
    "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5&offset=5";
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

  fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      getShows(response);
    })
    .then(json => {
      callback(json);
    });
};

const Authorize = ({
  setUserData,
  isSpotifyAuthorized,
  user: { display_name, images, items }
}) => {
  if (isSpotifyAuthorized && !display_name) {
    getData(setUserData);
    return <Spinner />;
  }
  if (display_name) {
    return (
      <div>
        <img src={images[0].url} />
        <h1>Hello {display_name}!</h1>
        {items && items.map(item => <span>{item.name}, </span>)}
        <Button
          onClick={e => {
            e.preventDefault();
            getArtists(setUserData);
          }}
        >
          get artists
        </Button>
        <p>
          Can we use your current location to show you only dates that are
          relevant to you?
        </p>
        <Button onClick={() => {}}>Allow Couch Tour to use my location</Button>
      </div>
    );
  }
  return (
    <div style={{ background: "#000", height: "100%" }}>
      <Button
        onClick={() =>
          authorizeSpotify(res => {
            setUserData(getData(res));
          })
        }
      >
        Authorize Spotify
      </Button>
    </div>
  );
};

const ConnectedComponent = connect(state => state, { setUserData })(Authorize);

export default ConnectedComponent;

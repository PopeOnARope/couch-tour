import React from "react";
import styled, { keyframes } from "react-emotion";
import { connect } from "react-redux";
import {
  setUserData,
  updateDistance,
  toggleMapView
} from "../../redux/reducers";
import Spinner from "react-spinkit";
import Button from "../Button/Button";
import ShowDetailsModal from "../ShowDetailsModal/ShowDetailsModal";
import Map from "../Map/Map";
import ShowCard from "../ShowCard/ShowCard";
import LazyLoad from "react-lazy-load";

import Recommendation from "../Recommendation/Recommendation";

const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const loadPosition = async callback => {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

    const hydratedPostion = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        position.coords.latitude
      },${
        position.coords.longitude
      }&key=AIzaSyDyrF2Wm56q4IhN8oO6mIbDXTxwjQUKK0Y`
    );
    const parsedHydratedPosition = await hydratedPostion.json();
    callback({
      position: { latitude, longitude, ...parsedHydratedPosition.results[5] }
    });
  } catch (error) {
    console.log(error);
  }
};

const getShows = async (position, callback) => {
  const location = window.location.href;
  const accessToken = location.slice(location.indexOf("token=") + 6);
  const response = await fetch("/api/shows", {
    method: "POST",
    body: JSON.stringify({
      position,
      accessToken
    }),
    headers: { "Content-Type": "application/json" }
  });
  const parsedResponse = await response.json();
  if (response.status !== 200) throw Error(parsedResponse.message);
  callback(parsedResponse);
};

const expand = keyframes`
0% {
  color: rgba(255,255,255,0);
  height: 0px;
}

100% {
  color: rgba(255,255,255,1);
  height: ${window.innerHeight - 140}px;
`;

const _Header = styled("div")`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  h3 {
    width: 100%;
  }
  align-items: center;
  .secondary {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-around;
  }
`;

const _Layout = styled("div")`
  width: 100%;
  height: 100%;
`;

const _ShowsContainer = styled("div")(props => ({
  display: "flex",
  flexDirection: "row",
  padding: "1rem",
  "@media(min-width: 768px)": {
    padding: `1rem, 2rem`
  },
  flexWrap: "wrap",
  justifyContent: "end",
  height: `${window.innerHeight - 140}px`,
  overflow: "scroll",
  animation: props.shouldReanimate ? `${expand} 1s ease-in 1` : "none",
  background: `linear-gradient(
    to bottom,
    rgba(75, 75, 75, 0.2) 0%,
    rgba(0, 0, 0, 0.85) 100%
  )`
}));

export const _SpinnerContainer = styled("div")`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 2rem;
  }
`;

const ShowsList = ({
  shows,
  user,
  setUserData,
  updateDistance,
  position,
  distance,
  currentShow,
  toggleMapView,
  mapViewToggled,
  shouldReanimate,
  artists
}) => {
  if (!position) {
    loadPosition(setUserData);
    return (
      <_SpinnerContainer>
        <p>loading location data...</p>{" "}
        <Spinner color="#eee" name="ball-scale-ripple-multiple" />
      </_SpinnerContainer>
    );
  }

  if (!user || !user.display_name) {
    getShows(position, setUserData).catch(err => {
      console.log(err);
    });
    return (
      <_SpinnerContainer>
        <p>fetching concert data...</p>
        <Spinner color="#eee" name="ball-scale-ripple-multiple" />
      </_SpinnerContainer>
    );
  }
  console.log(shouldReanimate);
  return (
    <_Layout>
      <_Header>
        <h3>
          Ok {user.display_name}, here are some upcoming shows within {distance}km{" "}
          of {position.address_components[0].short_name}
        </h3>
      </_Header>
      {!mapViewToggled && (
        <_ShowsContainer shouldReanimate={shouldReanimate}>
          {shows &&
            shows
              .filter(show => show.distance < distance)
              .map(show => <ShowCard {...show} />)}
          {artists &&
            artists.items
              .filter(artist => artist.popularity > 60)
              .map(artist => (
                <div style={{ height: "340px", width: "100%" }}>
                  <h3 style={{ textAlign: "left" }}>
                    Because you liked {artist.name}
                  </h3>
                  <LazyLoad height="500">
                    <Recommendation {...artist} position={position} />
                  </LazyLoad>
                </div>
              ))}
        </_ShowsContainer>
      )}
      {mapViewToggled && shows && <Map />}
    </_Layout>
  );
};

const ConnectedComponent = connect(state => state, {
  setUserData,
  updateDistance,
  toggleMapView
})(ShowsList);
export default ConnectedComponent;

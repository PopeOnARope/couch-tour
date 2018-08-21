import React from "react";
import styled, { keyframes } from "react-emotion";
import drummer from "../../assets/img/drummer.jpg";
import Button from "../Button/Button";
import Authorize from "../Authorize/Authorize";
import { Transition } from "react-transition-group";
import { connect } from "react-redux";
import { updateCurrentView, setUserData } from "../../redux/reducers";
import ShowsList from "../ShowsList/ShowsList";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Welcome = () => (
  <div className="innerText">
    <h1>Welcome to Couch Tour!</h1>
    <h2>The best way stay up to date on your favorite artists</h2>
    <p>
      Couch Tour analyzes data about your favorite artists from your spotify
      account and then tells you when artists you like are coming to town.
    </p>
    <Button to="/authorize">Get started</Button>
  </div>
);

const isSpotifyAuthorized = () => {
  const location = window.location.href;
  return location.includes("token");
};

const fadeIn = keyframes`
0% {
  background-position: 100% 100%;
}

100% {
  background-position: 0% 0%;
}
`;

const text = keyframes`
0% {
  color: rgba(255,255,255,0);
  margin-top: -5rem;
}

100% {
  color: rgba(255,255,255,1);
  margin-top: 0rem;
}
`;

const _ImageDiv = styled("div")`
  // background: url(${drummer});
  background-image: linear-gradient(90deg,#c074b2,#8ab5e8);
`;
const _GradientDiv = styled("div")`
  height: ${window.innerHeight}px;
  background: linear-gradient(
    0deg,
    rgba(33, 33, 33, 0.6) 50%,
    rgba(26, 80, 100, 0.4) 60%,
    rgba(26, 125, 150, 0.3) 75%,
    rgba(33, 175, 65, 0.2) 95%
  );

  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-size: 400% 400%;
  animation: ${fadeIn} 5s ease 1;

  button {
    animation: ${button} 4s ease 1;
  }
  .transition-exiting {
    animation: ${button} 4s ease 1;
  }
  .innerText {
    margin: auto;
    display: flex;
    flex-direction: column;
  }
`;

const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const browserHasGeolocationPermissions = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.permissions.query({ name: "geolocation" });
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

const Setup = ({ updateCurrentView, setUserData, shown, step }) => (
  <_ImageDiv>
    <_GradientDiv>
      <Router>
        <React.Fragment>
          <Route path="/welcome" component={() => <Welcome />} />
          <Route path="/authorize" component={() => <Authorize />} />
          <Route path="/callback" component={() => <ShowsList />} />
          <Route exact path="/" component={() => <Welcome />} />
        </React.Fragment>
      </Router>
    </_GradientDiv>
  </_ImageDiv>
);

const button = keyframes`
0% {
  bottom: -20rem;
}

80% {
  bottom: -20rem;
}

100% {
  bottom: 0rem;
}
`;

const ConnectedComponent = connect(state => state, {
  updateCurrentView,
  setUserData
})(Setup);

export default ConnectedComponent;

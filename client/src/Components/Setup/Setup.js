import React from "react";
import styled, { keyframes } from "react-emotion";
import drummer from "../../assets/img/drummer.jpg";
import Button from "../Button/Button";
import Authorize from "../Authorize/Authorize";
import { Transition } from "react-transition-group";
import { connect } from "react-redux";
import { updateCurrentView } from "../../redux/reducers";
import ShowsList from "../ShowsList/ShowsList";

const Welcome = () => (
  <React.Fragment>
    <h1>Welcome to Couch Tour!</h1>
    <h2>The best way stay up to date on your favorite artists</h2>
    <p>
      Couch Tour analyzes data about your favorite artists from your spotify
      account and then tells you when artists you like are coming to town.
    </p>
    <Button to="/authorize">Get started</Button>
  </React.Fragment>
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
  background: url(${drummer});
  width: 100%;
`;
const _GradientDiv = styled("div")`
  height: ${window.innerHeight}px;
  padding: 1rem;
  background: linear-gradient(
    0deg,
    rgba(33, 33, 33, 0.8) 50%,
    rgba(26, 80, 100, 0.8) 60%,
    rgba(26, 125, 150, 0.8) 75%,
    rgba(33, 175, 65, 0.8) 95%
  );

  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-size: 400% 400%;
  animation: ${fadeIn} 5s ease 1;
  .innerText {
    animation: ${text} 2s ease 1;
    width: 100%;
  }
  button {
    animation: ${button} 4s ease 1;
  }
  position: absolute;
  width: 100%;
  .transition-exiting {
    animation: ${button} 4s ease 1;
  }
`;

const Setup = ({ updateCurrentView, shown, step }) => (
  <_ImageDiv>
    <_GradientDiv>
      <div>
        <div className="innerText">
          {step === "welcome" && <Welcome />}
          {step === "authorize" && !isSpotifyAuthorized() && <Authorize />}
          {step === "list" && isSpotifyAuthorized() && <ShowsList />}
        </div>
      </div>
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

const StyledSetup = styled(Setup)`
  height: ${window.innerHeight}px;
  padding: 1rem;
  background: linear-gradient(
    0deg,
    rgba(26, 125, 150, 0.8) 52%,
    rgba(33, 175, 65, 0.8) 94%,
    rgba(33, 33, 33, 0.8) 94%
  );

  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-size: 200% 200%;
  animation: ${fadeIn} 5s ease 1;
  .innerText {
    animation: ${text} 2s ease 1;
    width: 100%;
  }
  button {
    animation: ${button} 4s ease 1;
  }
  position: absolute;
  width: 100%;
  .transition-exiting {
    animation: ${button} 4s ease 1;
  }
`;

const ConnectedComponent = connect(state => state, { updateCurrentView })(
  StyledSetup
);

export default ConnectedComponent;

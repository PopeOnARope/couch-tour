import React from "react";
import styled, { keyframes } from "react-emotion";
import drummer from "../../assets/img/drummer.jpg";
import Button from "../Button/Button";
import { Transition } from "react-transition-group";
import { connect } from "react-redux";
import { updateCurrentView } from "../../redux/reducers";

const Welcome = ({ className, updateCurrentView, shown }) => (
  <Transition in={shown} timeout={{ enter: 1000, exit: 1000 }}>
    {state => {
      console.log(`transition-${state}`);
      return (
        <div className={`transition-${state}`}>
          <div className={className}>
            <div className="innerText">
              <h1>Welcome to Couch Tour!</h1>
              <h2>The best way stay up to date on your favorite artists</h2>
              <p>
                Couch Tour analyzes data about your favorite artists from your
                spotify account and then tells you when artists you like are
                coming to town.
              </p>
              <Button to="/authorize">Get started</Button>
            </div>
          </div>
          <img
            src={drummer}
            style={{ height: `${window.innerHeight + 20}px` }}
          />
        </div>
      );
    }}
  </Transition>
);

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

const StyledWelcome = styled(Welcome)`
  height: ${window.innerHeight}px;
  padding: 1rem;
  background: linear-gradient(
    0deg,
    rgba(26, 125, 150, 0.8) 52%,
    rgba(33, 175, 65, 0.8) 94%
  );
  padding: 2rem;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-size: 200% 200%;
  animation: ${fadeIn} 5s ease 1;
  .innerText {
    display: flex;
    flex-direction: column;
    animation: ${text} 2s ease 1;
  }
  a {
    animation: ${button} 4s ease 1;
  }
  position: absolute;
  .transition-exiting {
    animation: ${button} 4s ease 1;
  }
`;

const ConnectedComponent = connect(() => {}, { updateCurrentView })(
  StyledWelcome
);

export default ConnectedComponent;

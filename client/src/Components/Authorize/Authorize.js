import React from "react";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import { authorizeSpotify } from "../../utils/login";
import { connect } from "react-redux";
import { setUserData } from "../../redux/reducers";
import styled from "react-emotion";

class Authorize extends React.Component {
  componentDidMount() {
    if (!this.props.isSpotifyAuthorized) {
      authorizeSpotify(this.getShows);
    }
  }
  render() {
    console.log(this.props);
    const {
      setUserData,
      isSpotifyAuthorized,
      user: { display_name, images, items },
      shows
    } = this.props;
    if (isSpotifyAuthorized && !display_name) {
      this.getShows(setUserData);
      return <Spinner />;
    }

    if (display_name) {
      return (
        <div>
          <img src={images[0].url} />
          <h1>Hello {display_name}!</h1>
        </div>
      );
    }
    return <div style={{ background: "#000", height: "100%" }} />;
  }
}

const ConnectedComponent = connect(state => state, { setUserData })(Authorize);

export default ConnectedComponent;

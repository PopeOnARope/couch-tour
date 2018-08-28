import React from "react";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import { connect } from "react-redux";
import { setUserData } from "../../redux/reducers";
import styled from "react-emotion";

const _AuthorizeForm = styled("div")`
  .form-element {
    cursor: pointer;
    text-align: default;
    &:hover {
      background: #ddd;
    }
    &:active {
      background: #ccc;
    }
  }
  .form-element,
  .form-heading {
    padding: 1rem;
    color: #444;
  }
  .second {
    border-top: 2px dashed #ccc;
  }
  .form-heading {
    border-bottom: 2px solid #ccc;
  }
  width: 100%;
  background: #eee;
  border: 1px solid #444;
  margin: 4rem;
  box-shadow: 3px 3px 1px #555;
`;

const authorizeSpotify = () => fetch("/login");

const AuthorizeForm = () => {
  return (
    <_AuthorizeForm>
      <div className="form-heading">
        Please authorize your spotify account and let us use your current
        location:
      </div>
      <div className="form-element">
        <span />
        <span>Enable Location Services</span>
      </div>
      <div className="form-element second" onClick={authorizeSpotify}>
        <span />
        <span>Authorize Spotify</span>
      </div>
    </_AuthorizeForm>
  );
};

class Authorize extends React.Component {
  componentDidMount() {
    if (!this.props.isSpotifyAuthorized) {
      authorizeSpotify();
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

    return <Spinner />;
    return <AuthorizeForm />;

    if (isSpotifyAuthorized && !display_name) {
      this.getShows(setUserData);
    }

    if (display_name) {
      return (
        <React.Fragment>
          <img src={images[0].url} />
          <h1>Hello {display_name}!</h1>
        </React.Fragment>
      );
    }
    return <div style={{ background: "#000", height: "100%" }} />;
  }
}

const ConnectedComponent = connect(state => state, { setUserData })(Authorize);

export default ConnectedComponent;

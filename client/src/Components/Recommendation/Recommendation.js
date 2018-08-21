import React from "react";
import LazyLoad from "react-lazy-load";
import styled from "react-emotion";
import ShowCard from "../ShowCard/ShowCard";
import Spinner from "react-spinkit";
import { _SpinnerContainer } from "../ShowsList/ShowsList";

const _Recommendation = styled("div")`
  height: ${props => props.height};
  position: relative;
  overflow: scroll;
`;

const _SideScroller = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: none;
`;

class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getShows = this.getShows.bind(this);
  }
  componentDidMount() {
    console.log("mounted", this.props);
    this.getShows(this.props.position, this.props.id);
  }
  async getShows(position, id) {
    const location = window.location.href;
    const accessToken = location.slice(location.indexOf("token=") + 6);
    const response = await fetch("/api/similarshows", {
      method: "POST",
      body: JSON.stringify({
        position,
        accessToken,
        id
      }),
      headers: { "Content-Type": "application/json" }
    });
    const parsedResponse = await response.json();
    if (response.status !== 200) throw Error(parsedResponse.message);

    this.setState(parsedResponse);
  }
  render() {
    const { name } = this.props;
    console.log(this.state);
    if (!this.state.shows) {
      return (
        <_SpinnerContainer>
          <p>loading recommended artists...</p>{" "}
          <Spinner color="#eee" name="ball-scale-ripple-multiple" />
        </_SpinnerContainer>
      );
    }
    return (
      <_Recommendation
        height={this.state && this.state.shows ? "auto" : "750px"}
      >
        <_SideScroller>
          {this.state &&
            this.state.shows &&
            this.state.shows.map(show => <ShowCard {...show} />)}
        </_SideScroller>
      </_Recommendation>
    );
  }
}

export default Recommendation;

import React from "react";
import styled, { keyframes } from "react-emotion";
import { connect } from "react-redux";
import { setUserData } from "../../redux/reducers";
import Spinner from "../Spinner/Spinner";

const getShows = async callback => {
  const location = window.location.href;
  const accessToken = location.slice(location.indexOf("token=") + 6);
  const response = await fetch("/api/shows", {
    method: "POST",
    body: JSON.stringify({
      position: { latitude: "32.776", longitude: "-79.931" },
      accessToken
    }),
    headers: { "Content-Type": "application/json" }
  });
  const parsedResponse = await response.json();
  if (response.status !== 200) throw Error(parsedResponse.message);
  callback(parsedResponse);
};

const _Header = styled("div")`
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  img {
    border-radius: 100%;
    height: 75%;
  }
`;

const _ShowCard = styled("div")`
  width: 10rem;
  display: inline-block;
  margin: 2rem;
  border: 1px solid #aaa;
  background: #ccc;
  color: #222;
  img {
    object-fit: cover;
  }
  p,
  h3 {
    margin: 0px;
  }
`;
const _CardContent = styled("div")`
  background: #eee;
`;
const _ImageContainer = styled("div")(props => ({
  height: "10rem",
  width: "10rem",
  background: `url(${props.background})`,
  backgroundSize: `100%`
}));

const _ShowsContainer = styled("div")`
  padding: 2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  height: ${window.innerHeight - 50}px;
  overflow: scroll;
`;
const ShowCard = ({
  offers,
  venue,
  datetime,
  on_sale_datetime,
  description,
  lineup,
  id,
  artist_id,
  url,
  image_url
}) => (
  <_ShowCard>
    <_ImageContainer background={image_url} />
    <_CardContent>
      <h3>{lineup && lineup[0]}</h3>
      <p>{venue.name}</p>
      <p>{venue.city}</p>
    </_CardContent>
  </_ShowCard>
);

const ShowsList = ({ shows, user, setUserData }) => {
  if (!user || !user.display_name) {
    getShows(setUserData);
    return <Spinner />;
  }
  return (
    <React.Fragment>
      <_Header>
        <input />
        <img src={user.images[0].url} />
      </_Header>
      <_ShowsContainer>
        {shows && shows.map(show => <ShowCard {...show} />)}
      </_ShowsContainer>
    </React.Fragment>
  );
};

const ConnectedComponent = connect(state => state, { setUserData })(ShowsList);
export default ConnectedComponent;

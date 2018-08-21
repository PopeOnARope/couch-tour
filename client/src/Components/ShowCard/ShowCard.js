import React from "react";
import styled, { keyframes } from "react-emotion";
import Button from "../Button/Button";

export const _ShowCard = styled("div")`
  display: inline-block;
  text-decoration: none;
  margin: 0.5rem;
  height: 260px;
  color: #000;
  font-size: 16px;
  width: 151px;
  font-weight: 500;
  white-space: normal;
  border-radius: 4px;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  position: relative;
  margin-bottom: 1.5rem;
  background: #eee;
  &:hover {
    box-shadow: 1px 1px 15px 2px rgba(255, 255, 255, 0.3);
  }
  p {
    margin: 0.025rem;
    font-weight: normal;
  }
  .card-overlay {
    position: absolute;
    border: 1px solid black;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    margin: -1px;
    z-index: 10;
    background: rgba(0, 0, 0, 0);
    transition: 0.4s;
    .actions {
      display: none;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.75);
      .actions {
        display: inherit;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
      }
      box-shadow: 1px 1px 15px 2px rgba(255, 255, 255, 0.3);
    }
  }
`;

const _CardContent = styled("div")`
  height: 6rem;
  h3 {
    color: ${props => props.theme.primary};
    margin-top: 0px;
    margin-bottom: 0.25rem;
  }
  .venue {
    font-weight: bold;
  }
`;

const _ImageContainer = styled("div")(props => ({
  borderTopRightRadius: "4px",
  borderTopLeftRadius: "4px",
  width: "151px",
  height: "151px",
  backgroundColor: "#ededed",
  overflow: "hidden"
}));

const _DateCard = styled("div")`
  position: absolute;
  padding: 0.25rem 0.5rem;
  right: 0.7rem;
  top: 5.5rem;
  text-align: center;
  background-color: #fff;
  border-radius: 3px;
  font-weight: 500;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.31);

  .day {
    font-size: 0.5rem;
  }
  .date {
    font-size: 1.25rem;
  }
  .month {
    font-size: 0.55rem;
  }
  .month,
  .date {
    color: ${props => props.theme.primary};
  }
`;

const getDate = date => {
  const d = new Date(date);
  var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  return {
    day: days[d.getDay()],
    month: months[d.getMonth()],
    date: d.getDate()
  };
};
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
  image_url,
  ...rest
}) => (
  <_ShowCard>
    <div className="card-overlay">
      <div className="actions">
        {offers &&
          !!offers.length && (
            <Button target="_blank" href={offers && offers[0] && offers[0].url}>
              Get tickets
            </Button>
          )}
        <Button target="_blank" href={url}>
          More Info
        </Button>
      </div>
    </div>
    <_ImageContainer>
      <img
        src={image_url}
        style={{
          width: "151px"
        }}
      />
      <_DateCard>
        <div className="day">{getDate(datetime).day}</div>
        <div className="date">{getDate(datetime).date}</div>
        <div className="month">{getDate(datetime).month}</div>
      </_DateCard>
    </_ImageContainer>
    <_CardContent>
      <h3>{lineup && lineup[0]}</h3>
      <p className="venue">{venue.name}</p>
      <p className="city">
        {venue.city}, {venue.region}
      </p>
    </_CardContent>
  </_ShowCard>
);

export default ShowCard;

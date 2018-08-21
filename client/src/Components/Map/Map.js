import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { toggleShowDetails } from "../../redux/reducers";
// import glamorous from "glamorous";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import React from "react";

const Map = props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{
      lat: props.position.latitude,
      lng: props.position.longitude
    }}
  >
    {props.shows &&
      props.shows
        .filter(show => show.distance < props.distance)
        .map((show, idx) => {
          return (
            <Marker
              position={{
                lat: Number(show.venue.latitude),
                lng: Number(show.venue.longitude)
              }}
              key={idx}
            >
              {props.showDetails && (
                <InfoWindow>
                  <div>
                    <h3>{show.lineup[0]}</h3>
                    <p style={{ maxWidth: "150px" }}>{show.details}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
  </GoogleMap>
);

const requiredProps = {
  googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDyrF2Wm56q4IhN8oO6mIbDXTxwjQUKK0Y&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `600px` }} />,
  mapElement: <div style={{ height: `100%` }} />
};

export const ComposedComponent = compose(
  withProps(requiredProps),
  withScriptjs,
  withGoogleMap
)(Map);

export default connect(state => state, { toggleShowDetails })(
  ComposedComponent
);

import React, { Component } from "react";
import Welcome from "./Components/Welcome/Welcome";
import Authorize from "./Components/Authorize/Authorize";
import Setup from "./Components/Setup/Setup";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/welcome" component={() => <Setup step={"welcome"} />} />
          <Route
            path="/authorize"
            component={() => <Setup step={"authorize"} />}
          />
          <Route
            path="/callback"
            component={() => <Setup step={"authorize"} />}
          />
          <Route exact path="/" component={() => <Setup step={"welcome"} />} />
        </div>
      </Router>
    );
  }
}

const ConnectedComponent = connect(state => {
  console.log(state);
  return state;
})(App);
export default ConnectedComponent;

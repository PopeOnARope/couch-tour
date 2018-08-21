import React, { Component } from "react";
import Welcome from "./Components/Welcome/Welcome";
import Authorize from "./Components/Authorize/Authorize";
import Setup from "./Components/Setup/Setup";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { ThemeProvider } from "emotion-theming";
const theme = { primary: "#259998" };

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: `${document.innerHeight}` }}>
        <ThemeProvider theme={theme}>
          <Setup />
        </ThemeProvider>
      </div>
    );
  }
}

const ConnectedComponent = connect(state => {
  console.log(state);
  return state;
})(App);
export default ConnectedComponent;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./routes/Login";
import Bookings from "./routes/Bookings";
import Events from "./routes/Events";
import NavBar from "./components/Navigation/NavBar";
import styled from "styled-components";


import "./App.css";

const Main = styled.main`
  margin: 4rem 2.5rem;
  
`;

function App() {
  return (
    <Router className="App">
      <NavBar />
      <Main>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/events" component={Events} />
          <Route path="/bookings" component={Bookings} />
        </Switch>
      </Main>
    </Router>
  );
}

export default App;

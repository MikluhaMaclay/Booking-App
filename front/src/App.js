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
import AuthContext from "./context/auth";

import "./App.css";

const Main = styled.main`
  margin: 4rem 2.5rem;
`;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <Router className="App">
      <AuthContext.Provider
        value={{ token: token, userId: userId, login: login, logout: logout }}
      >
      <NavBar />
        <Main>
          <Switch>
            {/* {!token && <Redirect exact from="/events" to="/login" />}
            {!token && <Redirect exact from="/bookings" to="/login" />}
            {token && <Redirect exact from="/" to="/events" />} */}
            {token && <Redirect exact from="/login" to="/events" />}
            {!token && <Route path="/login" component={Login} />}
            <Route path="/events" component={Events} />
            {!token && <Redirect exact  to="/login" />}
            {token && <Route path="/bookings" component={Bookings} />}
          </Switch>
        </Main>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;

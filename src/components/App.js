import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { PostContextProvider } from "./context/PostContext";
import { LoginContextProvider } from "./context/LoginContext";
import { UserContextProvider } from "./context/UserContext";
import { SearchContextProvider } from "./context/SearchContext";
import Home from "./Home";
import Entry from "./Entry";
import Login from "./Login";
import Signup from "./Signup";
import PrivateRoute from "./PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "../static/css/App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <LoginContextProvider>
              <UserContextProvider>
                <SearchContextProvider>
                  <PostContextProvider>
                    <Route exact path="/" component={Entry} />
                    <PrivateRoute exact path="/home" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                  </PostContextProvider>
                </SearchContextProvider>
              </UserContextProvider>
            </LoginContextProvider>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

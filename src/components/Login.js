import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import localforage from "localforage";
import _ from "lodash";

import GetApi from "./api/GetApi";
import { LoginContext } from "./context/LoginContext";
import { UserContext } from "./context/UserContext";

import TwitterLogo from "../static/image/twitter-logo.png";

// import { useTranslation } from "react-i18next";
// import LanguageSelect from "./languageSelect";

// import { Navbar, Nav, Container } from "react-bootstrap";

function Login() {
  const [login, setLogin] = useContext(LoginContext);
  const [user, setUser] = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(async () => {
    const cacheToken = await localforage.getItem('token')
    if (!_.isEmpty(cacheToken)) {
      history.push('/home')
    }
  }, [])

  const loginUser = async () => {
    if (values.email && values.password) {
      try {
        const response = await GetApi.loginUser(values);
        const res = await response.data;
        if (res.message === "Success") {
          setLogin(res.data);
          const authRes = await GetApi.authUser(res.data)
          const authRespond = await authRes.data
          if (authRespond.message === 'Success') {
            setUser(authRespond.data)
          } else {
            history.push('/')
          }
          await localforage.setItem("token", res.data);
          history.push("/home");
        } else {
          setErrorMessage(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEmailChange = (e) => {
    setValues((val) => ({
      ...val,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setValues((val) => ({
      ...val,
      password: e.target.value,
    }));
  };

  // const { t } = useTranslation();

  return (
    <div id="login" className="login">
      {/* <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>ANG Time</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto stickyright">
              <LanguageSelect />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto mt-5 text-center form mt-5 pt-1 pl-4 pr-4 pb-4 bg-white">
            <div className="row">
              <div className="col-2">
                <img src={TwitterLogo} alt="" className="w-100" />
              </div>
            </div>
            <div className="row mt-3 ml-2">
              <div className="h1 font-weight-bold">Login</div>
            </div>
            <div className="row mt-2 ml-2">
              <div className="form-group w-75 d-flex align-items-center">
                <input
                  id="email"
                  type="email"
                  className="form-control shadow-none"
                  placeholder="Phone, email, or username"
                  value={values.email}
                  onChange={handleEmailChange}
                />
                <span className="float-right ml-2 text-danger">*</span>
              </div>
            </div>
            <div className="row mt-2 ml-2">
              <div className="form-group w-75  d-flex align-items-center">
                <input
                  id="password"
                  type="password"
                  className="form-control shadow-none"
                  placeholder="Password"
                  value={values.password}
                  onChange={handlePasswordChange}
                />
                <span className="float-right ml-2 text-danger">*</span>
              </div>
            </div>
            <div className="row">
              <div className="form-group ml-4 text-danger">
                {!_.isEmpty(errorMessage) ? <div id="ErrorMessageLogin">{errorMessage}</div> : null}
              </div>
            </div>
            <div className="row ml-2 w-75">
              {!_.isEmpty(values.email) && !_.isEmpty(values.password) ? (
                <div
                  id="loginButton"
                  className="loginButtonEnable btn btn-primary rounded-pill w-100 p-2 font-weight-bold"
                  onClick={loginUser}
                >
                  Login
                </div>
              ) : (
                <div
                  id="loginButton"
                  className="loginButtonDisable btn btn-primary rounded-pill w-100 p-2 font-weight-bold disabled"
                  disabled
                >
                  Login
                </div>
              )}
            </div>
            <div className="row mt-4 mr-5 justify-content-center">
              {/* <div id="forgotPassword" className="text-primary" style={{ cursor: "pointer" }}>
                Forgot password?
              </div> */}
              <div className="text-primary">·</div>
              <Link id="loginSignup" to="/signup" className="text-primary mr-4">
                Sign up for Twitty
              </Link>

            </div>
            <div className="column mt-3" style={{ marginRight: "200px" }}>
              <div className="h5 font-weight-bold">Username : Christiano </div>
              <br />
              <div className="h5 font-weight-bold">Password : barcelona </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default Login;

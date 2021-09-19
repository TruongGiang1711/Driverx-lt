import React, { useState, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
} from "@coreui/react";
import authService from "src/services/authService";
import Joi from "joi-browser";
import Form from "src/views/component/common/form";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    loading: false,
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  setLoading(value) {
    this.setState({ loading: value });
  }
  setStateWithName(name, value) {
    const state = { ...this.state };
    state[name] = value;

    this.setState(state);
  }

  handleLogin = () => {
    this.setStateWithName("error", null);
    this.setLoading(true);
    const data = { ...this.state.data };
    console.log(data);
    authService
      .login(data.username, data.password)
      .then((response) => {
        this.setLoading(false);
        this.setStateWithName("error", null);
        // setUserSession(response.data.token, response.data.user);
        console.log("login success");
        //this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log("login error: ", error);
        this.setLoading(false);
        if (error.response.status === 403) {
          console.log(error.response.data);
          this.setStateWithName("error", "Username or password incorrect");
        }
        // if (error.response.status === 422)
        //   setError(error.response.detail.message);
        // else setError("Something went wrong. Please try again later.");
      });
  };

  handleInputChange = (input) => {
    const name = input.currentTarget.name;
    const value = input.currentTarget.value;
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
    console.log(value);
    console.log(name);
  };

  testError = () => {
    const error = this.state.error;
    console.log("error:", error);
    if (error == null) {
      return (
        <div className="alert alert-danger" style={{ display: "none" }}>
          ak
        </div>
      );
    } else {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/"></Redirect>;
    const data = { ...this.state.data };
    const username = data.username;
    const error = this.state.error;
    const loading = this.state.loading;

    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {this.renderInput("username", "Username")}
                      {this.renderInput("password", "Password", "password")}

                      {this.testError()}

                      <CRow>
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            className="px-4"
                            value={loading ? "Loading..." : "Login"}
                            onClick={this.handleLogin}
                            disabled={loading}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;

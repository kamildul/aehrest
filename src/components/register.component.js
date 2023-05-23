import React, { Component } from "react";
import UsersDataService from "../services/users.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.state = {
      login: "",
      password: "",
      firstName: "",
      lastName: "",
      messages: "",
      messagesType: ""
    };
  }

  onChangeLogin(e) {
    this.setState({
        login: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
        password: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
        firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
        lastName: e.target.value
    });
  }

  registerUser() {

    if(!this.state.login || !this.state.password || !this.state.firstName || !this.state.lastName) {
        this.setState({
          message: "Error! All form fields are required.",
          messageType: "alert alert-danger"
        });
      } else {
        var data = {
        login: this.state.login,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        };

        UsersDataService.register(data)
        .then(response => {
            this.setState({
                message: "Success! Your account has been registered.",
                messageType: "alert alert-success"
            });
        })
        .catch(e => {
            this.setState({
                message: "Error! The username is already exist.",
                messageType: "alert alert-danger"
              });
        });
    }
  }

  render() {
    return (
      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                        {this.state.message ? (<div className={this.state.messageType} role="alert">{this.state.message}</div>) : ("")}
                        <p>Register new account</p>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control"
                            id="login"
                            required
                            value={this.state.login}
                            onChange={this.onChangeLogin}
                            name="login"
                          />
                          <label htmlFor="title">Username</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            name="password"
                          />
                          <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control"
                            id="firsName"
                            required
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                            name="firsName"
                          />
                          <label htmlFor="firsName">First name</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            required
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                            name="lastName"
                          />
                          <label htmlFor="lastName">Last name</label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                            <button onClick={this.registerUser} className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Register</button>
                            <p className="mb-0 me-2"><small><Link to={"/"} className="text-muted">(return to login page)</Link></small></p>
                        </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">React project</h4>
                      <p className="small mb-0">
                        Authors:<br/>
                        Aleksandra Nowak<br/>
                        Piotr Piwowarski<br />
                        Julian Lewandowski<br/>
                        Kamil Dul
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Register);
import React, { Component } from "react";
import UsersDataService from "../services/users.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.loginUser = this.loginUser.bind(this);

    this.state = {
      login: "",
      password: "",
      message: "",
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

  loginUser() {
    if(!this.state.login || !this.state.password) {
      this.setState({
        message: "Error! All form fields are required.",
        messageType: "alert alert-danger"
      });
    } else {
      var data = {
        login: this.state.login,
        password: this.state.password
      };
      UsersDataService.login(data)
        .then(response => {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("user_id", response.data.user_id);
          sessionStorage.setItem("login", response.data.login);
          sessionStorage.setItem('exp', JSON.stringify(new Date().getTime() + 60000 * 30));
          window.location.reload(false);
        })
        .catch(e => {
          this.setState({
            message: "Error! Invalid login.",
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
                        <p>Please login to your account</p>
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
                        <div className="text-center pt-1 mb-5 pb-1">
                            <button onClick={this.loginUser} className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Log in</button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to={"/register"} className="btn btn-outline-danger">Create new</Link>
                        </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">React REST Api</h4>
                      <p className="small mb-0">
                        Authors:<br/>
                        Aleksandra Nowak<br/>
                        Piotr Piwowarski<br />
                        Julian Lewandowski<br/>
                        Kamil Dul<br/>
                        Szymon Sabatowski
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

export default withRouter(Login);
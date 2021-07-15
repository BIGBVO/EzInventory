import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import '../styles/accounts.css';

export class Login extends Component {
  state = {
    //state variable set to '' to make input controlled
    username: '',
    password: '',
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    // add the login function and ensure it is a function
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => { // function called when submit is pressed through the form below
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
    // pass username and password to the function to login
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() { // return the view
    if (this.props.isAuthenticated) {
      // if the account is authenticated, it will be redirected to the home page
      return <Redirect to="/" />;
    }
    // if the account is not authenticated, it will ask the user to login
    const { username, password } = this.state;
    return (
      <div>
        <div className="card card-body mt-5">
          <h2 className="loginWord">Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="loginForm">
              <label>Username</label>
              <input
                type="text"
                className="inputForm"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>

            <div className="loginForm">
              <label>Password</label>
              <input
                type="password"
                className="inputForm"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div className="loginForm">
              <button type="submit" className="loginButton nav-link">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

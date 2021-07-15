import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {Redirect} from "react-router-dom";
import {changePassword} from "../../actions/auth";

import logo from '../assets/logo.png';
import '../styles/accounts.css';

export class Profile extends Component {

  constructor(props) {
    console.log("constructor to password")
    super(props);
    this.state = {
      update_password: false,
    }
    this.updatePassword = this.updatePassword.bind(this);
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
    // check the changePassword function is loaded
  };

  updatePassword() {
    this.setState( {
      update_password:true
    })
  }


  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const {update_password} = this.state;
    const isLoading = this.props.isLoading;
    if (!isLoading && update_password) {
      // if loading is completed, and the update_password variable is set to true, redirect
      console.log("redirection to password");
      return <Redirect to="update-password"/>;
    } else {
      return ( // render the profile content page
          <div className="mt-5">
            <div>
              <div className="profileGrid card card-body">
                <div>
                  <img
                      className="logo"
                      alt="logo"
                      src={logo}
                      width="90%"
                  />
                </div>
                <div className="profileItemGrid">
                  <label className="userInfoHeading"> User Information </label>
                  <div className="userInfo">
                    <label className="userInfoLabel"> UserID : {this.props.user.id}</label>
                    <label className="userInfoLabel"> Username : {this.props.user.username}</label>
                    <label className="userInfoLabel"> Privilege : {this.props.user.privilege}</label>
                  </div>
                  <button type="submit"
                          onClick={() => this.updatePassword()}
                          className="updatePasswordButton">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
      );
    }
  }
}


const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {changePassword})(Profile);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from '../../actions/users';
import {Redirect} from "react-router-dom";
import styles from "../styles/products.css";


export class CreateUser extends Component {

  constructor(props){
      super(props);
      // set up default state to be overriden later on
      this.state = {
          username: '',
          password: '',
          name: '',
          privilege: "BO",
          updated : false,
          back: false,
      }
      this.back = this.back.bind(this);
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    createUser: PropTypes.func.isRequired,
  };


  back(){ // i.e. aborted changes
    this.setState({
      back: true
    })
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => { // handles when user submit the form
    e.preventDefault();
    const { username, password, name, privilege } = this.state;
    const user = {username, password, name, privilege};
    this.props.createUser(user); // call create user function
    this.setState({ // reset the state back to default
          username: '',
          password: '',
          name: '',
          privilege:'',
          updated: true
    });
  };

  render() {
    const { back, updated, username, password, name, privilege } = this.state;
    const isLoading = this.props.isLoading;
    if (!isLoading){ // if loading completed
        if(back || updated) {
            return <Redirect to= "/" />; // redirect back to profile
        }
      return (
        <Fragment>
            <nav className="userPageNavigation navbar navbar-expand-sm">
              <div className="container">
                <div className="collapse navbar-collapse">
                    <button className="backButton"
                      onClick={() => this.back()}>
                        Back
                    </button>
                  <span className="pageHeading">
                    <a>{`Add an Employee`}</a>
                  </span>
                </div>
              </div>
            </nav>
            <div className="userFormDiv card card-body">
              <form onSubmit={this.onSubmit}>
                <div className={styles.settings}>
                  <span className="navbar-text mr-3">
                    <strong>{`Create a new user with username: ${username}`}</strong>
                  </span>
                </div>
                  <div className="UserForm">
                    <label>Username</label>
                    <input
                      className="UserFormInput"
                      id = "user_username"
                      type="text"
                      name="username"
                      required
                      onChange={this.onChange}
                      value={username}
                    />
                  </div>
               <div className="UserForm">
                <label>Password</label>
                    <input
                      className="UserFormInput"
                      type="password"
                      id = "password"
                      name="password"
                      minLength="8"
                      required
                      onChange={this.onChange}
                      value={password}
                    />
              </div>
              <div className="UserForm">
                <label>Employee Full Name</label>
                    <input
                      className="UserFormInput"
                      type="text"
                      id = "name"
                      name="name"
                      required
                      onChange={this.onChange}
                      value={name}
                    />
              </div>
              <div className="UserForm">
                <label>Privilege</label>
                <select
                  className="UserFormInput"
                  name="privilege"
                  id = "privilege"
                  onChange={this.onChange}
                  value={privilege}
                  >
                  <option value="BO">Business Owner</option>
                  <option value="MN">Manager</option>
                  <option value="SS">Sales Staff</option>
                  <option value="WS">Warehouse Staff</option>
                </select>
              </div>

              <div className="UserForm">
                <button type="submit" className="createUserButton">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </Fragment>
      );
    } else {
      return(<Fragment/>);
    }
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.users.isLoading, // get isLoading from the users state
});

export default connect(mapStateToProps, { createUser })(CreateUser);

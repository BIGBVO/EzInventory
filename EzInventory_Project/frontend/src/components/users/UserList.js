import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getAllUsers, getUser, deleteAccount} from '../../actions/users';
import { Redirect } from 'react-router-dom';

import '../styles/users.css'
export class UserList extends Component {

  constructor(props){
      super(props);
      // set up default state
      this.state = {
          list_all_users: true,
          back_to_home_page: false,
          create_new_user : false,
          username : '',
          delete_user: false
      }
    
      this.add = this.add.bind(this);
      this.back = this.back.bind(this);
  }

  static propTypes = { // declare variables and functions required
    user_list: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
  };

  componentDidMount() {
    // call get all users as the first thing when mount with this page
    this.props.getAllUsers();
  }

  back(){ //handle case where user wants to return to home page
    const {list_all_users} = this.state;
    if (list_all_users == true){ // if all users are listed
      this.setState({
        back_to_home_page : true
      })
    } else { //handles when users are not yet listed
      this.props.getAllUsers();
      this.setState({
        list_all_users : true
      })
    }
  }

  add() { // set create_user state
    this.setState({
        create_user: true
    })
  }

  delete(username) {
      // call delete account function
      this.props.deleteAccount(username)
      this.setState({
          delete_user: true
      })
  }

  render() {
    // declare constants
    const {create_user, username, back_to_home_page, delete_user} = this.state;
    const isLoading = this.props.isLoading;
    if (!isLoading){ // if loading, then wait
      if (delete_user){ // if delete user, redirect back to home after sending request to backend
        return <Redirect to= "/#" />;
      } else if (create_user){
        return <Redirect to="/create-user"/>
      } else if (back_to_home_page){
        return <Redirect to = "/#" />;
      } else {
        return (
            <Fragment>
              <nav className="userPageNavigation navbar navbar-expand-sm">
                <div className="container">
                  <div className="collapse navbar-collapse">
                      <button className="backButton"
                        onClick={() => this.back()}>
                          Back
                      </button>
                    <h1 className="pageHeading">
                      User List
                    </h1>
                    <ul className="actionBar navbar-nav">
                      <li className="nav-item">
                        <button
                          className="addUserButton"
                          onClick={() => this.add()}>
                            Create User
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Username</th>
                    <th>Privilege</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.user_list.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.privilege}</td>
                      <td>
                        <button
                          onClick={() => this.delete(user.username)}
                          className="deleteUserButton"
                        >
                          {' '}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Fragment>
        );
      }
    } else {
      return(<Fragment/>);
    }
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.users.isLoading,
  user_list: state.users.user_list,
});

export default connect(mapStateToProps, { getAllUsers, deleteAccount })(UserList);

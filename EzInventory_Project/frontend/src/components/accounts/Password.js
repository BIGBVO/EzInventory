import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changePassword } from '../../actions/auth';
import styles from '../styles/products.css'
import { Redirect } from 'react-router-dom';

export class Password extends Component {

  constructor(props){
      super(props);
      this.state = {
        username: this.props.user.username,
        password: '',
        new_password: '',
        name: this.props.user.name,
        privilege: this.props.user.privilege,
        updated : false,
        back: false,
      }
      this.back = this.back.bind(this);
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired
    // ensure the changePassword is load
  };

  back(){ // i.e. aborted changes
    this.setState({
      back: true
    })
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
      const { username, password, new_password, name, privilege } = this.state;
      const current_user = this.props.user;

      // check if the input is valid or not
      if(username === current_user.username &&
      password === current_user.password && name === current_user.name &&
          privilege === current_user.privilege) {
        const user = null;
        this.props.changePassword(user);
      }
      else {
        const user = {username, password,new_password, name, privilege};
        this.props.changePassword(user);
        this.setState({
          updated: true
        });
      }
  };

  render() {
    const {back, username, new_password, password, updated} = this.state;
    const isLoading = this.props.isLoading;
    if (!isLoading){
      if (back || updated){
        return <Redirect to= "/" />; // redirect back to profile
      } else {
        return (
          <Fragment>
            <nav className=" changePasswordNavigation navbar navbar-expand-sm">
              <div className="container">
                <div className="navbar-collapse">
                    <button className="backButton"
                      onClick={() => this.back()}>
                        Back
                    </button>
                  <span className="navbar-brand">
                    <a>{`Update Password for ${username}`}</a>
                  </span>
                </div>
              </div>
            </nav>

            <div className="changeProfileGrid card card-body">
              <form onSubmit={this.onSubmit}>
                <div className={styles.settings}>
                  <span className="navbar-text mr-3">
                    <strong>{`Username : ${username}`}</strong>
                  </span>
                </div>
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    className="form-control"
                    type="password"
                    id = "password"
                    name="password"
                    required
                    onChange={this.onChange}
                    value={password}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    id = "new_pass"
                    name="new_password"
                    minLength="8"
                    required
                    onChange={this.onChange}
                    value={new_password}
                  />
                </div>
                <div className="form-group">
                    <button className="updatePasswordButton">
                      Update Password
                    </button>
                </div>
              </form>
            </div>
          </Fragment>
        );
      }
    } else {
      return(<Fragment/>);
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {changePassword})(Password);
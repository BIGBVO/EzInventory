import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import '../styles/layout.css'

export class Header extends Component {
  static propTypes = {
    // set prop variables and functions that is needed
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    
    if (!isAuthenticated){ // if user is not authenticated
      return(
        <nav className="navbar navbar-expand-sm navigationBar">
        <div className="container">
          <div className="navbar-collapse" id="navbarTogglerDemo01">
            <a className="EzInventoryBrand" href="#">
              EzInventory
            </a>
          </div>
        </div>
      </nav>
      )
    } else if (user.privilege == "SS"){ // if user has a privilege of sales staff
        return( 
          <nav className="navbar navbar-expand-sm navigationBar">
            <div className="container">
              <div className="navbar-collapse" id="navbarTogglerDemo01">
                <a className="EzInventoryBrand" href="#">
                  EzInventory
                </a>
                <ul className=" pageNavigation navbar-nav ">
                  <li>
                    <Link to="/checkout" className=" pageNavigationItem nav-link ">
                      Checkout
                    </Link>
                  </li>
                  <li>
                    <Link to="/invoices" className=" pageNavigationItem nav-link ">
                      Invoices
                    </Link>
                  </li>
                  <li>
                    <Link to="/product-list" className="pageNavigationItem nav-link">
                      Product List
                    </Link>
                  </li>
                </ul>
              </div>
              <ul className="authLink navbar-nav">
                <span className="welcomeText">
                  <strong>{user ? `Welcome ${user.username}` : ''}</strong>
                </span>
                <li className="nav-item">
                  <button onClick={this.props.logout} className="logOutButton nav-link">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        );
    } else if (user.privilege == "WS"){ // if user has a privilege of warehouse staff
      return( 
        <nav className="navbar navbar-expand-sm navigationBar">
          <div className="container">
            <div className="navbar-collapse" id="navbarTogglerDemo01">
              <a className="EzInventoryBrand" href="#">
                EzInventory
              </a>
              <ul className=" pageNavigation navbar-nav ">
                <li>
                  <Link to="/product-management" className="pageNavigationItem nav-link">
                    Product Management
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="authLink navbar-nav">
              <span className="welcomeText">
                <strong>{user ? `Welcome ${user.username}` : ''}</strong>
              </span>
              <li className="nav-item">
                <button onClick={this.props.logout} className="logOutButton nav-link">
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </nav>
      );
    } else { // if user has a privilege of business owner or manager
        return( 
          <nav className="navbar navbar-expand-sm navigationBar">
            <div className="container">
              <div className="navbar-collapse" id="navbarTogglerDemo01">
                <a className="EzInventoryBrand" href="#">
                  EzInventory
                </a>
                <ul className=" pageNavigation navbar-nav ">
                  <li>
                    <Link to="/checkout" className=" pageNavigationItem nav-link ">
                      Checkout
                    </Link>
                  </li>
                  <li>
                    <Link to="/invoices" className=" pageNavigationItem nav-link ">
                      Invoices
                    </Link>
                  </li>
                  <li>
                    <Link to="/product-management" className="pageNavigationItem nav-link">
                      Product Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-list" className="pageNavigationItem nav-link">
                          Staff Management
                    </Link>
                  </li>
                </ul>
              </div>
              <ul className="authLink navbar-nav">
                <span className="welcomeText">
                  <strong>{user ? `Welcome ${user.username}` : ''}</strong>
                </span>
                <li className="nav-item">
                  <button onClick={this.props.logout} className="logOutButton nav-link">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);

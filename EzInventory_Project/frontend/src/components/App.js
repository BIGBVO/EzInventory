import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';
import Alerts from './layout/Alerts';

import PrivateRoute from './common/PrivateRoute';
import SalesRoute from './common/SalesRoute';
import WarehouseRoute from './common/WarehouseRoute';
import AdminRoute from './common/AdminRoute';

import Login from './accounts/Login';
import Profile from './accounts/Profile';
import Password from './accounts/Password';

import UserList from './users/UserList';
import CreateUser from './users/CreateUser';

import Product from './products/Product';
import UpdateProduct from './products/UpdateProduct';
import AddProduct from './products/AddProduct';
import ProductList from './products/ProductList';

import Checkout from './checkout/Checkout';
import ItemList from './checkout/ItemList';
import CheckoutEdit from './checkout/CheckoutEdit';

import Invoices  from './invoices/Invoices';
import ViewInvoice from './invoices/ViewInvoice';
import ReturnItem from './invoices/ReturnItem';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';


// Alert Options
const alertSettings = {
  timeout: 2500,
  position: 'top center',
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertSettings}>
          <Router>
            <Fragment>
                <Header />
                <Alerts />
                <div className="container">
                    <Switch>
                      <Route exact path="/login" component={Login} />
                      
                      <PrivateRoute exact path="/" component={Profile} />
                      <PrivateRoute exact path="/update-password" component={Password} />

                      <AdminRoute exact path="/create-user" component={CreateUser} />
                      <AdminRoute exact path="/user-list" component={UserList} />
    
                      <WarehouseRoute exact path="/product-management" component={Product} />
                      <WarehouseRoute exact path="/update-product" component={UpdateProduct} />
                      <WarehouseRoute exact path="/add-product" component={AddProduct} />

                      <SalesRoute exact path="/product-list" component={ProductList} />

                      <SalesRoute exact path='/checkout' component={Checkout} />
                      <SalesRoute exact path='/item-list' component={ItemList} />
                      <SalesRoute exact path='/checkout-edit' component={CheckoutEdit} />

                      <SalesRoute exact path='/invoices' component={Invoices} />
                      <SalesRoute exact path='/view-invoice' component={ViewInvoice} />
                      <SalesRoute exact path='/return-item' component={ReturnItem} />
                    </Switch>
                </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

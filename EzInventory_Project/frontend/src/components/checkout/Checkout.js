import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {removeProductFromBasket, finaliseCheckout} from '../../actions/checkout';
import { Redirect } from 'react-router-dom';

import '../styles/checkout.css'

export class Checkout extends Component {

  constructor(props){
      super(props);
      this.state = {
        // default values provided to enable controlled input
        add_item : false,
        edit_item : false,
        can_edit : false,
        checkout_finalise : false,
        invoice_type : 0,
        total_price : 0,
      }
      this.add_item = this.add_item.bind(this);
      this.edit_item = this.edit_item.bind(this);
      this.finalise_checkout = this.finalise_checkout.bind(this);
  }

  static propTypes = {
    basket: PropTypes.array.isRequired,
    isLoading : PropTypes.bool.isRequired,
    removeProductFromBasket :  PropTypes.func.isRequired,
    finaliseCheckout : PropTypes.func.isRequired,
    // check removeProduct and finaliseCheckout functions are loaded correctly
  };

  componentDidMount(){
    // mount declares the actions when the page is first mounted
    if (this.props.basket.length > 0){
      var total_price = 0;
      for (var i = 0; i  < this.props.basket.length; i++){
        total_price += this.props.basket[i].total_price;
      }
      this.setState({
        can_edit : true,
        total_price : total_price,
      })
    }
  }

  add_item() {
    // set add_item state
    this.setState({
        add_item: true
    })
  }

  edit_item() {
    // set edit_item state
    if (this.state.can_edit){
      this.setState({
        edit_item: true
      })
    }
  }

  finalise_checkout() {
    // call finaliseCheckout function
    const{invoice_type, total_price} = this.state;
    const invoice_item = this.props.basket;
    const invoice = {invoice_type, total_price, invoice_item};
    this.props.finaliseCheckout(invoice);
    this.setState({
      checkout_finalise : true
    })
  }

  render() {
      const{add_item, edit_item, checkout_finalise} = this.state;

      if (!this.props.isLoading){
        if (add_item){ // redirection depends on the state variables
          return <Redirect to= "/item-list" />;
        } else if (edit_item){
          return <Redirect to = "/checkout-edit" />
        } else if (checkout_finalise){
          return <Redirect to = "/invoices" />
        } else {
          return ( // return default view
              <Fragment>
                <nav className="invoicePageNavigation navbar navbar-expand-sm">
                  <div className="container">
                    <div className="navbar-collapse">
                      <h1 className="pageHeading">
                        New Invoice
                      </h1>
                      <ul className= "navbar-nav">
                        <li className="nav-item mr-2 ml-4" > 
                            <button
                              className="editInvoiceButton"
                              onClick={() => this.edit_item()}>
                                Edit Invoice
                            </button>
                        </li>
                      </ul>
                      <ul className="actionBar navbar-nav">
                        <li className="nav-item mr-2" > 
                          <button
                            className="addInvoiceButton"
                            onClick={() => this.add_item()}>
                              Add Item
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
                
              <div className="invoiceFormDiv card card-body ">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Product_Code</th>
                      <th>Product_Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.props.basket.map((item, index) => (
                          <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.product_code}</td>
                              <td>{item.product_name}</td>
                              <td>{item.purchase_price}</td>
                              <td>{item.quantity}</td>
                              <td>{item.total_price}</td>
                          </tr>
                      ))}
                  </tbody>
                </table>
              </div>
                <button
                  onClick={() => this.finalise_checkout()}
                  className="finaliseCheckoutButton"
                >
                  Finalise Checkout
                </button>
              </Fragment>
          );
        }
      } else {
        return(
          <Fragment/>
        ); 
      }  
  }
}

const mapStateToProps = (state) => ({
  basket: state.checkout.basket,
  isLoading: state.checkout.isLoading,
});

export default connect(mapStateToProps, {removeProductFromBasket, finaliseCheckout})(Checkout);

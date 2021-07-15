import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeProductFromBasket } from '../../actions/checkout';
import { Redirect } from 'react-router-dom';

import '../styles/checkout.css'

export class CheckoutEdit extends Component {

  constructor(props){
      super(props);
      this.state = {
        basket : this.props.basket,
        item_removed : false,
        back: false
      }
      this.remove_item = this.remove_item.bind(this);
      this.back = this.back.bind(this);
  }

  static propTypes = {
    basket: PropTypes.array.isRequired,
    isLoading : PropTypes.bool.isRequired,
    removeProductFromBasket :  PropTypes.func.isRequired,
      // check the removeProductFromBasket function is loaded
  };

  back(){
    //handles when user wants to go back to previous page
    this.setState({
      back: true
    })
  }

  remove_item(item_code) {
    //call remove item function and set prop state
    this.props.removeProductFromBasket(item_code);
    this.setState({
        item_removed : true
    })
  }

  render() {
      const{basket, item_removed, back} = this.state;
      if (!this.props.isLoading){
        if (item_removed || back){ // redirect when state is item_removed or back
            return <Redirect to= "/checkout"/>;
        }else {
          return (
              <Fragment>
                <nav className="invoicePageNavigation navbar navbar-expand-sm">
                  <div className="container">
                    <div className="navbar-collapse">
                        <button className="backButton"
                          onClick={() => this.back()}>
                            Back
                        </button>
                        <h1 className="pageHeading">
                            New Invoice
                        </h1>
                    </div>
                  </div>
                </nav>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product_Code</th>
                            <th>Product_Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {basket.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.product_code}</td>
                                <td>{item.product_name}</td>
                                <td>{item.purchase_price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.total_price}</td>
                                <td>
                                    <button
                                        onClick={() => this.remove_item(item.product_code)}
                                        className="deleteItemButton"
                                    >
                                        Remove
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
        <Fragment/>
      }  
  }
}

const mapStateToProps = (state) => ({
  basket: state.checkout.basket,
  products: state.products.products,
  isLoading: state.checkout.isLoading,
});

export default connect(mapStateToProps, { removeProductFromBasket })(CheckoutEdit);

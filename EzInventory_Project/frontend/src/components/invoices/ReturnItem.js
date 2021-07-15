import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { returnItem, finaliseReturn } from '../../actions/invoices';
import { Redirect } from 'react-router-dom';

import '../styles/invoices.css'

export class ReturnItem extends Component {

  constructor(props){
      super(props);
      this.state = {
          back : false
      }
      this.returnItem = this.returnItem.bind(this);
      this.finaliseReturn = this.finaliseReturn.bind(this);
      this.back = this.back.bind(this);
  }

  static propTypes = {
    // declare the required functions and variables
    invoices: PropTypes.array.isRequired,
    invoice_items : PropTypes.array.isRequired,
    invoice_item_info : PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    return_finalised: PropTypes.bool.isRequired,
    returnItem : PropTypes.func.isRequired
  };

  back(){ // abort and return to previous
    this.setState({
      back : true // set state
    })
  }

  returnItem(product_code) { // call return item function, return one single item
    this.props.returnItem(product_code);
  }
  
  finaliseReturn(){ // process the overall return
    this.props.finaliseReturn();
  }

  render() {
    const {back} = this.state;
    const {id} = this.props.invoices[0];
    const isLoading = this.props.isLoading;
    const return_finalised = this.props.return_finalised;
    
    if (!isLoading){ // if completed loading
      if (back){
        return <Redirect to = "/view-invoice" />;
      } else if (return_finalised){
        return <Redirect to = "/invoices" />;
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
                    <span className="pageHeading">
                      <a>{`Invoice ID: ${id}`}</a>
                    </span>
                  </div>
                </div>
              </nav>

              <div className="invoiceFormDiv card card-body ">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Product Code</th>
                      <th>Product Name</th>
                      <th>Purchase Price</th>
                      <th>Quantity Purchase</th>
                      <th>Total Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.invoice_item_info.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.product_code}</td>
                        <td>{item.product_name}</td>
                        <td>{item.current_price}</td>
                        <td>1</td>
                        <td>{item.current_price}</td>
                        <td>
                        <button
                          onClick={() => this.returnItem(item.product_code)}
                          className="returnItemButton"
                        >
                          Return
                        </button>
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                  onClick={() => this.finaliseReturn()}
                  className="finaliseReturnButton"
                >
                  Finalise Return
              </button>
            </Fragment>
        );
      } 
    } else {
      return(<Fragment/>);
    }
  }
}

const mapStateToProps = (state) => ({
  invoices: state.invoices.invoices,
  invoice_items : state.invoices.invoice_items,
  invoice_item_info : state.invoices.invoice_item_info,
  isLoading: state.invoices.isLoading,
  return_finalised: state.invoices.return_finalised,
});

export default connect(mapStateToProps, {returnItem, finaliseReturn})(ReturnItem);
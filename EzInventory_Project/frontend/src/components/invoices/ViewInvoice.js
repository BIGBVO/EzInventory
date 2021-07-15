import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  } from '../../actions/invoices';
import { Redirect } from 'react-router-dom';

import '../styles/invoices.css'

export class viewInvoice extends Component {

  constructor(props){
      super(props);
      //set default values
      this.state = {
          process_return : false,
          back : false
      }
      this.processReturn = this.processReturn.bind(this);
      this.back = this.back.bind(this);
  }

  static propTypes = {
    // declare the default variables and functionalities
    invoices: PropTypes.array.isRequired,
    invoice_items : PropTypes.array.isRequired,
    invoice_item_info : PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  back(){
    this.setState({ // abort and go back
      back : true
    })
  }


  processReturn() { // set process return to true
    this.setState({
        process_return: true
    })
  }

  
  render() {
    const {process_return, back} = this.state;
    const {id, invoice_type} = this.props.invoices[0];
    const isLoading = this.props.isLoading;
    
    if (!isLoading){ // if loading completed
      if (back){
        return <Redirect to = "/invoices" />;
      } else if (process_return){
        return <Redirect to = "/return-item" />;
      } else if (invoice_type == 0){ // if invoice  is a purchase invoice
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
                  <ul className="actionBar navbar-nav">
                    <li className="nav-item mr-2" > 
                      <button
                        className="ProcessReturnButton"
                        onClick={() => this.processReturn()}>
                          Process Return
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
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Purchase Price</th>
                    <th>Quantity Purchase</th>
                    <th>Total Price</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </Fragment>
        );
      } else if (invoice_type == 1) { // if invoice  is a return invoice
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Fragment>
        );
      } else {
        return(<Fragment/>);
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
  // map to the necessary variables
});

export default connect(mapStateToProps, { })(viewInvoice);
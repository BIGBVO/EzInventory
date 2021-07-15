import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) { // execute this function when the page is first mounted
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
        if (error.msg.username){ // handles username error
          alert.error(`Username: ${error.msg.username.join()}`);
        }  
        if (error.msg.password){ // handles passwprd error
          alert.error(`Password: ${error.msg.password.join()}`);
        }
        if (error.msg.non_field_errors){ // handles no such field error
          alert.error(error.msg.non_field_errors.join());
        } 
        if (error.msg.product_code){ // handles product code error
          alert.error(`Product Code: ${error.msg.product_code.join()}`);
        }
        if (error.msg.product_name){ // handles product name error
          alert.error(`Product Name: ${error.msg.product_name.join()}`);
        }
        if (error.msg.quantity_in_stock){ // handles quality in stock error
          alert.error(`Quantity: ${error.msg.quantity_in_stock.join()}`);
        }
        if (error.msg.current_price){ // handles price error
          alert.error(`Price: ${error.msg.current_price.join()}`);
        }
    }

    if (message != prevProps.message){

        //success
        if (message.loginSuccess){
          alert.success(message.loginSuccess);
        }
        if (message.logoutSuccess){
          alert.success(message.logoutSuccess);
        }
        if (message.addProduct){
          alert.success(message.addProduct);
        }
        if (message.updateProduct){
          alert.success(message.updateProduct)
        }
        if (message.return_success){
          alert.success(message.return_success)
        }
        if (message.changePassword){
          alert.success(message.changePassword)
        }
        if (message.addUser){
          alert.success(message.addUser)
        }

        //error
        if (message.enter_product_code){
          alert.error(message.enter_product_code);
        }
        if (message.product_not_found){
          alert.error(message.product_not_found);
        }
        if (message.product_not_updated){
          alert.error(message.product_not_updated);
        }
        if (message.quantity_not_zero){
          alert.error(message.quantity_not_zero);
        }
        if (message.invoice_not_found){
          alert.error(message.invoice_not_found);
        }
        if (message.changePasswordFail){
          alert.error(message.changePasswordFail)
        }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
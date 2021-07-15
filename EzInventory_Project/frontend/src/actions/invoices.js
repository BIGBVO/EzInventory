import axios from 'axios';
import { getErrors } from './alerts/error'
import { createMessage }from './alerts/message'
import { tokenConfig } from './auth';

import {GETTING_INVOICE, 
        GET_INVOICE, 
        GET_INVOICE_FAIL,
        LOADING_ALL_INVOICE, 
        LOAD_ALL_INVOICE, 
        LOAD_ALL_INVOICE_FAIL,
        GETTING_INVOICE_ITEM,
        GET_INVOICE_ITEM,
        GET_INVOICE_ITEM_FAIL,
        RETURNING_ITEM,
        ITEM_RETURNED,
        RETURN_ITEM_FAILED,
        FINALISING_RETURN,
        RETURN_FINALISED,
        FINALISE_RETURN_FAILED
      } from './types';


// get all the invoices in the database
export const listAllInvoice = () => (dispatch, getState) => {
  dispatch ({type: LOADING_ALL_INVOICE});
  axios
    .get(`/api/invoice/`, tokenConfig(getState))
    .then((res) => {
        // handle user data not found
      if (res.data == null){
        dispatch(createMessage({ invoice_not_found: 'No invoice exists in the system' }));
      } else {
        dispatch({
          type: LOAD_ALL_INVOICE,
          payload: res.data,
        });
      }
    })
  .catch((err) => {
    dispatch(getErrors(err.response.data, err.response.status));
    dispatch({
      type:LOAD_ALL_INVOICE_FAIL,
    });
  });
};

// get specific invoice by ID in the database
export const getInvoice = (invoice_id) => (dispatch, getState) => {
  dispatch ({type: GETTING_INVOICE});
  axios
    .get(`/api/invoice/${invoice_id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_INVOICE,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch(createMessage({ invoice_not_found: 'No invoice with this ID exists in the system' }));
      dispatch({
        type:GET_INVOICE_FAIL,
      });
    });
}

// get all the item inside a specific invoice
export const getInvoiceItem = (invoice_id) => (dispatch, getState) => {
  dispatch ({type: GETTING_INVOICE_ITEM});
  axios
    .get(`/api/invoice/item/${invoice_id}`, tokenConfig(getState))
    .then((res) => {
      if (res.data.invoice_item.length == 0){
        dispatch(createMessage({ invoice_not_found: 'No invoice with this ID exists in the system' }));
        dispatch({
          type:GET_INVOICE_ITEM_FAIL,
        });
      } else {
        dispatch({
          type: GET_INVOICE_ITEM,
          payload: res.data,
        })
      }
    })
    .catch((err) => {
      dispatch(getErrors(err.response.data, err.response.status));
      dispatch({
        type:GET_INVOICE_ITEM_FAIL,
      });
    });
}

// process return and put the return item in the return basket
export const returnItem = (product_code) => (dispatch, getState) => {
  dispatch ({type: RETURNING_ITEM});
  var basket = getState().invoices.invoice_item_info;
  var exist = false;
  for (var i = 0; i < basket.length; i ++){
    if (product_code == basket[i].product_code){
        exist = true;
        var returned_item = basket[i];
        basket.splice(i, 1);
        dispatch({
          type : ITEM_RETURNED,
          payload: basket,
          returned_item: returned_item
        })
        break;
    }
  }

  if (!exist){
    dispatch(createMessage({ invoice_item_not_found: 'No Item with the code exist in the invoice' }));
    dispatch({
      type : RETURN_ITEM_FAILED
    })
  }
}

//finalise the return process and create a returning invoice
export const finaliseReturn = () => (dispatch, getState) => {
  dispatch ({type: FINALISING_RETURN});

  const return_basket = getState().invoices.return_basket;
  const invoice_type = 1;
  var total_refund = 0;
  var invoice_item = [];
  for (var i = 0; i < return_basket.length; i++){
    total_refund += parseFloat(return_basket[i].current_price);
    const product_code = return_basket[i].product_code;
    const product_name = return_basket[i].product_name;
    const quantity = 1;
    const purchase_price = return_basket[i].current_price;
    const total_price = return_basket[i].current_price;
    const item = {product_code, product_name, quantity, purchase_price, total_price};
    invoice_item = [...invoice_item, item];
  }
  const total_price = total_refund;
  const return_invoice = {invoice_type, total_price, invoice_item};
  
  axios
      .post('/api/invoice/', return_invoice, tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage({ return_success: 'Return Success' }));
        dispatch({
          type: RETURN_FINALISED
        });
      })
    .catch((err) => {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
            type: FINALISE_RETURN_FAILED
        });
    });
}

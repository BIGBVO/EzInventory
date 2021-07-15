import axios from 'axios';
import { getErrors } from './alerts/error'
import { createMessage }from './alerts/message'
import { tokenConfig } from './auth';

import {PRODUCT_ADDED_TO_BASKET, 
        PRODUCT_REMOVED_FROM_BASKET, 
        FINALISE_CHECKOUT, 
        CHECKOUT_FAIL,
        CHECKOUT_SUCCESS
        } from '../actions/types'


//Adding item to shopping basket
export const addProductToBasket = (product) => (dispatch) => {
    dispatch({
        type: PRODUCT_ADDED_TO_BASKET,
        payload: product,
    })
}

//Remove item from shopping basket
export const removeProductFromBasket = (product_code) => (dispatch, getState) => {
  const basket = getState().checkout.basket;
  console.log(basket.length);
  for ( var i = 0; i < basket.length; i++){
    console.log(basket[i].product_code)
    if (product_code == basket[i].product_code){
      basket.splice(i, 1);
        dispatch({
          type: PRODUCT_REMOVED_FROM_BASKET,
          payload: basket,
        })
      break;
    } 
  }
}

//Finalise Checkout and create purchasing invoice
export const finaliseCheckout = (invoice) => (dispatch, getState) => {
  const basket = getState().checkout.basket;

    //try to check if there is item exist in the shopping basket
    if (basket.length > 0){
      dispatch({type: FINALISE_CHECKOUT});
      axios
        .post('/api/invoice/', invoice, tokenConfig(getState))
        .then((res) => {
          dispatch(createMessage({ checkout_success: 'Checkout Success' }));
          dispatch({
            type: CHECKOUT_SUCCESS
          });
        })
      .catch((err) => {
        dispatch(getErrors(err.response.data, err.response.status));
        dispatch({
          type: CHECKOUT_FAIL
        });
       });
    } else {
      dispatch({
        type: CHECKOUT_FAIL
      });
    }
  };
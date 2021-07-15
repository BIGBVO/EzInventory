import axios from 'axios';
import { getErrors } from './alerts/error'
import { createMessage }from './alerts/message'
import { tokenConfig } from './auth';

import { PRODUCT_ADDED ,GET_PRODUCT, GET_PRODUCT_LOADED, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_LOADED,
         UPDATE_PRODUCT, PRODUCT_UPDATED, DELETE_PRODUCT, PRODUCT_DELETED, GET_PRODUCT_FAIL } from './types';

// ADD Product
export const addProduct = (product) => (dispatch, getState) => {
    axios
      .post('/api/product/create', product, tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage({ addProduct: 'Product Added' }));
        dispatch({
          type: PRODUCT_ADDED,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(getErrors(err.response.data, err.response.status)));
};

// Get Product by product code
export const getProduct = (product_code) => (dispatch, getState) => {
  if (product_code == null){
    dispatch(createMessage({ invalid_product_code: 'Invalid Product Code' }));
  } else {
    dispatch({ type: GET_PRODUCT });
    axios
    .get(`/api/product/search_code?product_code=${product_code}`, tokenConfig(getState))
    .then((res) => {
      if (res.data.product == null){
        dispatch(createMessage({ product_not_found: 'No product found in the system' }));
        dispatch({
          type : GET_PRODUCT_FAIL
        })
      } else {
        dispatch({
          type: GET_PRODUCT_LOADED,
          payload: res.data.product,
        });
      }
    })
    .catch((err) => dispatch(getErrors(err.response.data, err.response.status)));
  }
};

// List All Products
export const getAllProducts = () => (dispatch, getState) => {
  dispatch({ type: GET_ALL_PRODUCTS });
  axios
    .get('/api/product/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ALL_PRODUCTS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(getErrors(err.response.data, err.response.status)));
};

// Update Product
export const updateProduct = (product) => (dispatch, getState) => {
  if (product == null){
      dispatch(createMessage({ product_not_updated: 'Nothing has been edited' }));
  } else {
    dispatch({ type: UPDATE_PRODUCT });
    axios
      .post('/api/product/update_product', product, tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage({ updateProduct: 'Product Updated' }));
        dispatch({
          type: PRODUCT_UPDATED,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(getErrors(err.response.data, err.response.status)));
  }
};

// Delete Stock
export const deleteProduct = (product_code) => (dispatch, getState) => {
  if (product_code == null){
    dispatch(createMessage({ quantity_not_zero: 'The product quantity is not zero.' }));
  } else {
    dispatch({ type: DELETE_PRODUCT });
    
    const token = getState().auth.token;

    axios.delete('/api/product/delete', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      data: {
        'product_code': product_code
      }
    }).then((res) => {
        dispatch(createMessage({ deleteProduct: 'Product Deleted' }));
        dispatch({
          type: PRODUCT_DELETED,
          payload: product_code,
        });
      })
      .catch((err) => dispatch(getErrors(err.response.data, err.response.status)));
  }
};
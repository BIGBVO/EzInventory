import {
  GETTING_INVOICE, 
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
} 
from "../actions/types";


//invoice reducers
const initialState = {
  invoices: [],
  invoice_items: [],
  invoice_item_info: [],
  return_basket : [],
  isLoading: false,
  return_finalised: false,
};

export default function (state = initialState, action) {

switch (action.type) {
  case LOADING_ALL_INVOICE:
  case GETTING_INVOICE:
  case GETTING_INVOICE_ITEM:
  case RETURNING_ITEM:
  case FINALISING_RETURN:
    return{
      ...state,
      isLoading: true,
    }
   
  case LOAD_ALL_INVOICE:
    return {
      ...state,
      invoices:  action.payload,
      invoice_items : [],
      invoice_item_info : [],
      isLoading: false,
      return_finalised : false,
    };

  case GET_INVOICE:
    return {
      ...state,
      invoices: [action.payload],
      isLoading: false,
    }
  
  case GET_INVOICE_ITEM:
    return {
      ...state,
      invoice_items : action.payload.invoice_item,
      invoice_item_info : action.payload.products_info,
      isLoading : false,
    }

  case ITEM_RETURNED:
    return {
      ...state,
      invoice_item_info : action.payload,
      return_basket : [...state.return_basket, action.returned_item],
      isLoading : false,
    }

  case RETURN_FINALISED:
    return {
      ...state,
      return_basket : [],
      isLoading : false,
      return_finalised : true,
    }

  case RETURN_ITEM_FAILED:
  case LOAD_ALL_INVOICE_FAIL:
  case GET_INVOICE_ITEM_FAIL:
  case GET_INVOICE_FAIL:
  case  FINALISE_RETURN_FAILED:
    return{
      ...state,
      isLoading: false
    }

  default:
    return state;
}

}
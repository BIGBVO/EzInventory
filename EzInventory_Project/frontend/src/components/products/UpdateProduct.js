import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProduct, updateProduct, deleteProduct } from '../../actions/products';
import styles from '../styles/products.css'
import { Redirect } from 'react-router-dom';

import '../styles/products.css'
export class UpdateProduct extends Component {

  constructor(props){
      super(props);
      this.state = {
        // set default values to enable controlled inputs
        product_code : this.props.products[0].product_code,
        product_name : this.props.products[0].product_name,
        quantity_in_stock : this.props.products[0].quantity_in_stock,
        current_price : this.props.products[0].current_price,
        description : this.props.products[0].description,
        updated : false,
        back : false,
        deleted : false
      }

      this.back = this.back.bind(this);
      this.delete = this.delete.bind(this);
  } 

  static propTypes = {
    // declare the props that is needed
    isLoading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    updateProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
  };

  back(){
    // handles the case when user wants to return to previous page
    this.setState({
      back: true // set the prop state
    })
  }

  delete(){
    // call delete product function
    const {product_code, quantity_in_stock} = this.state;
    if (quantity_in_stock > 0){
      this.props.deleteProduct(null);
    } else {
      this.props.deleteProduct(product_code);
      this.setState({
        deleted: true // set prop delete state
      }) 
    }
  }
  
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    // handles the form submission
    e.preventDefault(); // if nothing has been changed, abort
    const { product_code, product_name, quantity_in_stock, current_price, description } = this.state;
    const current_product = this.props.products[0];

    if (product_name == current_product.product_name && quantity_in_stock == current_product.quantity_in_stock
        && current_price == current_product.current_price && description == current_product.description){
          const product = null;
          this.props.updateProduct(product);
          // if the same contents has been entered, call the update function with null
    } else {
      // case where attributes are being updated
      const product = { product_code, product_name, quantity_in_stock, current_price, description };
      this.props.updateProduct(product);
      this.setState({
        updated : true
      });
    }
  };

  render() {
    const {product_code, product_name, quantity_in_stock, current_price, description, updated, back, deleted } = this.state;
    const isLoading = this.props.isLoading;
    if (!isLoading){ // check state variable
      if (back || updated || deleted){
        return <Redirect to= "/product-management" />;
      } else {
        return ( // return default page
          <Fragment>
            <nav className="productsPageNavigation navbar navbar-expand-sm">
              <div className="container">
                <div className="navbar-collapse">
                    <button className="backButton"
                      onClick={() => this.back()}>
                        Back
                    </button>
                  <span className="pageHeading">
                    <a>{`Update Product: ${product_code}`}</a>
                  </span>
                  <ul className="actionBar navbar-nav">
                    <li className="nav-item mr-2" > 
                      <button
                        className="deleteProductButton"
                        onClick={() => this.delete()}>
                          Delete Product
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
    
            <div className="productFormDiv card card-body">
              <form onSubmit={this.onSubmit}>
                <div className={styles.settings}>
                  <span className="navbar-text mr-3">
                    <strong>{`Product Code : ${product_code}`}</strong>
                  </span>
                </div>
                <div className="ProductForm">
                  <label>Product Name</label>
                  <input
                    className="ProductFormInput"
                    type="text"
                    name="product_name"
                    onChange={this.onChange}
                    value={product_name}
                  />
                </div>
                <div className="ProductForm">
                  <label>Quantity In Stock</label>
                  <input
                    className="ProductFormInput"
                    type="number"
                    min= "0"
                    name="quantity_in_stock"
                    onChange={this.onChange}
                    value={quantity_in_stock}
                  />
                </div>
                <div className="ProductForm">
                  <label>Current Price</label>
                  <input
                    className="ProductFormInput"
                    type="number"
                    step="0.01"
                    min="0.00"
                    name="current_price"
                    onChange={this.onChange}
                    value={current_price}
                  />
                </div>
                <div className="ProductForm">
                  <label>Description</label>
                  <textarea
                    className="ProductFormInput"
                    type="text"
                    name="description"
                    onChange={this.onChange}
                    value={description}
                  />
                </div>
                <div className="ProductForm">
                  <button className="updateProductButton">
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </Fragment>
        );
      }
    } else {
      return(<Fragment/>);
    }
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  isLoading: state.products.isLoading,
});

export default connect(mapStateToProps, { getProduct, updateProduct, deleteProduct })(UpdateProduct);

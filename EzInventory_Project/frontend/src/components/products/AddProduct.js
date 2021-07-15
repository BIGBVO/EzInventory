import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct } from '../../actions/products';


export class AddProduct extends Component {

  constructor(props){
      super(props);
      // set default state
      this.state = {
        product_code : '',
        product_name : '',
        quantity_in_stock : '',
        current_price : '',
        description : ''
      }
  } 

  static propTypes = {
    // declare the necessary variables and functions
    isLoading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    addProduct: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault(); // prevent the case where no input has been made
    const { product_code, product_name, quantity_in_stock, current_price, description } = this.state;
    const product = { product_code, product_name, quantity_in_stock, current_price, description };
    this.props.addProduct(product); // call add product function
    this.setState({ // reset to default state
      product_code : '',
      product_name : '',
      quantity_in_stock : '',
      current_price : '',
      description : ''
    });
  };

  render() {
    const { product_code, product_name, quantity_in_stock, current_price, description } = this.state;
    const isLoading = this.props.isLoading;
    if (!isLoading){ // if finished loading
      return (
        <Fragment>
          <h1 className="addProductPageTitle"> Add Product Page</h1>
  
          <div className="productFormDiv card card-body">
            <form onSubmit={this.onSubmit}>
              <div className="ProductForm">
                <label>Product Code</label>
                <input
                  className="ProductFormInput"
                  type="text"
                  name="product_code"
                  onChange={this.onChange}
                  value={product_code}
                />
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
                <button type="submit" className="addProductButton float-right mt-3">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </Fragment>
      );
    } else {
      return(<Fragment/>);
    }
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  isLoading: state.products.isLoading,
});

export default connect(mapStateToProps, { addProduct })(AddProduct);

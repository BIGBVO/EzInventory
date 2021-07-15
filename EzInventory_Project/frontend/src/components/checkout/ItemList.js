import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProduct, getAllProducts} from '../../actions/products';
import {addProductToBasket} from '../../actions/checkout';

import { Redirect } from 'react-router-dom';

import '../styles/checkout.css'

export class ItemList extends Component {

  constructor(props){
      super(props);
      this.state = {
          product_code : '',
          all_product_listed: true,
          back_to_checkout_page: false,
          item_added: false,
      }
      this.addItem = this.addItem.bind(this);
      this.back = this.back.bind(this);
  }

  static propTypes = {
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getProduct: PropTypes.func.isRequired,
    getAllProducts: PropTypes.func.isRequired,
    addProductToBasket : PropTypes.func.isRequired,
    // check getProduct, getAllProducts, addProductToBasket are loaded correctly
  };

  componentDidMount() {
    // call get all products function when this page is first mounted
    this.props.getAllProducts();
  }

  back(){
    const {all_product_listed} = this.state;
    if (all_product_listed == true){
      this.setState({
        back_to_checkout_page : true
      })
    } else {
      this.props.getAllProducts();
      this.setState({
        all_product_listed : true
      })
    }
  }

  addItem(product_code, product_name, purchase_price) {
    const quantity = 1; 
    const total_price = parseFloat(purchase_price);
    const item = {product_code, product_name, quantity, purchase_price, total_price};
    this.props.addProductToBasket(item);
    this.setState({
        item_added: true
    })
  }


  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { product_code } = this.state;
    this.props.getProduct(product_code);
    this.setState({
      product_code: ''
    });

    if (this.props.products != null){
      this.setState({
        all_product_listed: false
      })
    }
  };

  render() {
    const {product_code, item_added, back_to_checkout_page} = this.state;
    const isLoading = this.props.isLoading;
    if (!isLoading){
      if (back_to_checkout_page || item_added){
        return <Redirect to = "/checkout" />;
      } else {
        return (
            <Fragment>
              <nav className="itemPageNavigation navbar navbar-expand-sm">
                <div className="container">
                  <div className="navbar-collapse">
                      <button className="backButton"
                        onClick={() => this.back()}>
                          Back
                      </button>
                    <h1 className="pageHeading">
                      Product List
                    </h1>
                    <ul className="actionBar navbar-nav">
                      <li className="nav-item">
                        <form className="itemSearchForm" onSubmit={this.onSubmit}>
                          <input
                            className="itemSearchBar"
                            display="inline-block"
                            type="text"
                            name="product_code"
                            placeholder="search..."
                            onChange={this.onChange}
                            value={product_code}
                          />
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Product_Code</th>
                    <th>Product_Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th/>
                  </tr>
                </thead>
                <tbody>
                  {this.props.products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.product_code}</td>
                      <td>{product.product_name}</td>
                      <td>{product.quantity_in_stock}</td>
                      <td>{product.current_price}</td>
                      <td>
                        <button
                          onClick={() => this.addItem(product.product_code, product.product_name, product.current_price)}
                          className="addProductButton"
                        >
                          Add Item
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
      return(<Fragment/>);
    }
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  isLoading: state.products.isLoading,
});

export default connect(mapStateToProps, { getProduct, getAllProducts, addProductToBasket })(ItemList);

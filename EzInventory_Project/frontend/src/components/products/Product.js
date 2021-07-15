import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getProduct, getAllProducts} from '../../actions/products';
import { Redirect } from 'react-router-dom';

import '../styles/products.css'
export class Product extends Component {

  constructor(props){
      super(props);
      //declare default value
      this.state = {
          all_product_listed: true,
          back_to_home_page: false,
          update : false,
          add_product : false,
          product_code : '',
      }
      this.updateProduct = this.updateProduct.bind(this);
      this.add = this.add.bind(this);
      this.back = this.back.bind(this);
  }

  static propTypes = {
    //declare necessary prop types
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getProduct: PropTypes.func.isRequired,
    getAllProducts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // call get all products function as the first thing when the page is mounted
    this.props.getAllProducts();
  }

  back(){ // return to the previous page
    const {all_product_listed} = this.state;
    if (all_product_listed == true){ // if loaded, return back to home
      this.setState({
        back_to_home_page : true
      })
    } else { // if not loaded, load
      this.props.getAllProducts();
      this.setState({
        all_product_listed : true
      })
    }
  }

  add() { //set add product state
    this.setState({
        add_product: true
    })
  }

  updateProduct(product_code) { // call get product function and set state
    this.props.getProduct(product_code);
    this.setState({
        loading: true,
        update: true
    })
  }


  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault(); // prevent if no values have been changed
    const { product_code } = this.state;
    this.props.getProduct(product_code);
    this.setState({
      product_code: ''
    });

    if (this.props.products != null){ // if the products are not empty, set to default
      this.setState({
        all_product_listed: false
      })
    }
  };

  render() {
    const {update, add_product, product_code, back_to_home_page} = this.state;
    const isLoading = this.props.isLoading;
    if (!isLoading){// if loading is completed
      if (update){ // redirect to update
        return <Redirect to= "/update-product" />;
      } else if (add_product){
        return <Redirect to="/add-product"/>;
      } else if (back_to_home_page){
        return <Redirect to = "/#" />;
      } else {
        return (
            <Fragment>
              <nav className="productsPageNavigation navbar navbar-expand-sm">
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
                      <li className="nav-item mr-2" > 
                        <button
                          className="addProductButton"
                          onClick={() => this.add()}>
                            Add Product
                        </button>
                      </li>
                      <li className="nav-item">
                        <form className="productSearchForm" onSubmit={this.onSubmit}>
                          <input
                            className="productSearchBar"
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
                    <th>ID</th>
                    <th>Product_Code</th>
                    <th>Product_Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Last Update</th>
                    <th/>
                  </tr>
                </thead>
                <tbody>
                  {this.props.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>{product.product_code}</td>
                      <td>{product.product_name}</td>
                      <td>{product.quantity_in_stock}</td>
                      <td>{product.current_price}</td>
                      <td>{product.last_update}</td>
                      <td>
                        <button
                          onClick={() => this.updateProduct(product.product_code)}
                          className="editProductButton"
                        >
                          {' '}
                          Edit
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
  // map the necessary variables
});

export default connect(mapStateToProps, { getProduct, getAllProducts })(Product);

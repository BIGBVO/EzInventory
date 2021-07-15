import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getInvoice, listAllInvoice, getInvoiceItem} from '../../actions/invoices';
import { Redirect } from 'react-router-dom';

import '../styles/invoices.css'

export class Invoices extends Component {

  constructor(props){
      super(props);
      // declare the default states
      this.state = {
          invoice_id : '',
          all_invoice_listed: true,
          back_to_home_page: false,
          view_invoice : false,
      }
      this.viewInvoice = this.viewInvoice.bind(this);
      this.back = this.back.bind(this);
  }

  static propTypes = {
    invoices: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getInvoice: PropTypes.func.isRequired,
    listAllInvoice: PropTypes.func.isRequired,
    getInvoiceItem: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // call lsit all invoice when this file is first mounted
    this.props.listAllInvoice();
  }

  back(){
    const {all_invoice_listed} = this.state;
    if (all_invoice_listed == true){ // if listed, then return to home
      this.setState({
        back_to_home_page : true
      })
    } else { // if not yet listed, call list all invoice function
      this.props.listAllInvoice();
      this.setState({
        all_invoice_listed : true
      })
    }
  }

  
  viewInvoice(invoice_id) { // call invoice function and set state
    this.props.getInvoice(invoice_id);
    this.props.getInvoiceItem(invoice_id);
    this.setState({
        view_invoice: true
    })
  }
  
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { invoice_id } = this.state;
    this.props.getInvoice(invoice_id);
    this.setState({
      invoice_id: ''
    });

    if (this.props.invoices != null){ // if no invoice in the current prop
      this.setState({
        all_invoice_listed: false
      })
    }
  };

  render() {
    const {invoice_id, view_invoice, back_to_home_page} = this.state;
    const isLoading = this.props.isLoading;

    if (!isLoading){ // if finished loading
      if (view_invoice){
        return <Redirect to= "/view-invoice" />;
      } else if (back_to_home_page){
        return <Redirect to = "/#" />;
      } else {
        return (
            <Fragment>
              <nav className="invoicePageNavigation navbar navbar-expand-sm">
                <div className="container">
                  <div className="navbar-collapse">
                      <button className="backButton"
                        onClick={() => this.back()}>
                          Back
                      </button>
                    <h1 className="pageHeading">
                      Invoice List
                    </h1>
                    <ul className="actionBar navbar-nav">
                      <li className="nav-item">
                        <form className="invoiceSearchForm" onSubmit={this.onSubmit}>
                          <input
                            className="invoiceSearchBar"
                            display="inline-block"
                            type="text"
                            name="invoice_id"
                            placeholder="search..."
                            onChange={this.onChange}
                            value={invoice_id}
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
                    <th>Invoice ID</th>
                    <th>invoice Type</th>
                    <th>Total Price</th>
                    <th>Timestamp</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.invoices.map((invoice, index) => (
                    <tr key={index}>
                      <td>{invoice.id}</td>
                      <td>{invoice.invoice_type}</td>
                      <td>{invoice.total_price}</td>
                      <td>{invoice.invoice_timestamp}</td>
                      <td>
                        <button
                          onClick={() => this.viewInvoice(invoice.id)}
                          className=" viewInvoiceButton"
                        >
                          View
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
  invoices: state.invoices.invoices,
  isLoading: state.invoices.isLoading,
});

export default connect(mapStateToProps, { getInvoice, listAllInvoice, getInvoiceItem })(Invoices);
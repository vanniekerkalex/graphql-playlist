import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAddressesQuery,
  addCustomerMutation,
  getCustomersQuery
} from "../queries/queries";

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      sname: "",
      addressId: ""
    };
  }
  displayAddresses() {
    var data = this.props.getAddressesQuery;
    if (data.loading) {
      return <option disabled>Loading addresses</option>;
    } else {
      return data.addresses.map(address => {
        return (
          <option key={address.id} value={address.id}>
            {address.street}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    // use the addBookMutation
    if (this.state.fname.length > 0 && this.state.sname.length > 0) {
      if (this.state.addressId.length > 0 && this.state.addressId !== "Select address") {
        this.props.addCustomerMutation({
          variables: {
            fname: this.state.fname,
            sname: this.state.sname,
            addressId: this.state.addressId
          },
          refetchQueries: [{ query: getCustomersQuery }]
        });
      } else {
        alert("Please select an address from the list. If it is not there, please add the address before adding the customer.");
      }
    } else {
      alert("The firstname and lastname fields may not be empty.");
    }
  }
  render() {
    return (
      <form id="add-customer" onSubmit={this.submitForm.bind(this)}>
        <h3>Add Customer</h3>
        <div className="field">
          <label>First Name:</label>
          <input
            type="text"
            onChange={e => this.setState({ fname: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Last Name:</label>
          <input
            type="text"
            onChange={e => this.setState({ sname: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Address:</label>
          <select onChange={e => this.setState({ addressId: e.target.value })}>
            <option>Select address</option>
            {this.displayAddresses()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAddressesQuery, { name: "getAddressesQuery" }),
  graphql(addCustomerMutation, { name: "addCustomerMutation" })
)(AddCustomer);

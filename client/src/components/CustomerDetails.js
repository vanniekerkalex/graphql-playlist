import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getCustomerQuery } from "../queries/queries";

class CustomerDetails extends Component {
  displayCustomerDetails() {
    const { customer } = this.props.data;
    if (customer) {
      return (
        <div>
          <h2>{customer.fname} {customer.sname}</h2>
          <h3>Address</h3>
          <p>{customer.address.street}</p>
          <p>{customer.address.suburb}</p>
          <p>{customer.address.code}</p>
        </div>
      );
    } else {
      return <div>No customer selected...</div>;
    }
  }
  render() {
    return <div id="customer-details">{this.displayCustomerDetails()}</div>;
  }
}

export default graphql(getCustomerQuery, {
  options: props => {
    return {
      variables: {
        id: props.customerId
      }
    };
  }
})(CustomerDetails);

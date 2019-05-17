import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getCustomersQuery } from "../queries/queries";

// components
import CustomerDetails from "./CustomerDetails";

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayCustomers() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading customers...</div>;
    } else {
      return data.customers.map(customer => {
        return (
          <li
            key={customer.id}
            onClick={e => {
              this.setState({ selected: customer.id });
            }}
          >
            {customer.fname + " " + customer.sname}
          </li>
        );
      });
    }
  }
  render() {
    //console.log(this.props);
    return (
      <div>
        <ul id="customer-list">{this.displayCustomers()}</ul>
        <CustomerDetails customerId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getCustomersQuery)(CustomerList);

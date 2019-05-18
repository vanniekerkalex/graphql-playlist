import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  addAddressMutation,
  getAddressesQuery
} from "../queries/queries";

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      suburb: "",
      code: ""
    };
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.street.length > 0 && this.state.suburb.length > 0 && this.state.code.length > 3) {
      this.props.addAddressMutation({
        variables: {
          street: this.state.street,
          suburb: this.state.suburb,
          code: this.state.code
        },
        refetchQueries: [{ query: getAddressesQuery }]
      });
    } else {
      alert("Please complete all fields with valid information.");
    }
  }

  render() {
    return (
      <form id="add-address" onSubmit={this.submitForm.bind(this)}>
        <h3>Add Address</h3>
        <div className="field">
          <label>Street:</label>
          <input
            type="text"
            onChange={e => this.setState({ street: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Suburb:</label>
          <input
            type="text"
            onChange={e => this.setState({ suburb: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Code:</label>
          <input
            type="text"
            onChange={e => this.setState({ code: e.target.value })}
          />
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(addAddressMutation, { name: "addAddressMutation" })
)(AddAddress);

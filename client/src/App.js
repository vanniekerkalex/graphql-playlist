import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Container, Row } from 'react-bootstrap';
import './App.css';

//components
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import AddAddress from "./components/AddAddress";

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Capfin - Customer List</h1>
          <CustomerList />
          <Container>
            <Row>
              <AddCustomer />
              <AddAddress />
            </Row>
          </Container>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

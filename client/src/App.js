import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Container, Row, Image } from 'react-bootstrap';
import './App.css';

//components
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import AddAddress from "./components/AddAddress";

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/api"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <div id="main1">
            <a href="/"><Image id="mainLogo" src={require("./logo.png")} fluid /></a>
            <h3 id="main1">Customer List</h3>
          </div>
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

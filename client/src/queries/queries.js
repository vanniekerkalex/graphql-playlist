import { gql } from "apollo-boost";

const getAddressesQuery = gql`
  {
    addresses {
      street
      suburb
      code
      id
    }
  }
`;

const getCustomersQuery = gql`
  {
    customers {
      fname
      sname
      id
    }
  }
`;

const addCustomerMutation = gql`
  mutation AddCustomer($fname: String!, $sname: String!, $addressId: ID!) {
    addCustomer(fname: $fname, sname: $sname, addressId: $addressId) {
      fname
      sname
      id
    }
  }
`;

const addAddressMutation = gql`
  mutation AddAddress($street: String!, $suburb: String!, $code: String!) {
    addAddress(street: $street, suburb: $suburb, code: $code) {
      street
      suburb
      code
      id
    }
  }
`;

const getCustomerQuery = gql`
  query GetCustomer($id: ID) {
    customer(id: $id) {
      fname
      sname
      address {
        id
        street
        suburb
        code
      }
    }
  }
`;

const getAddressQuery = gql`
  query GetAddress($id: ID) {
    address(id: $id) {
      street
      suburb
      code
      customers {
        id
        fname
        sname
      }
    }
  }
`;

export { getAddressesQuery, getCustomersQuery, addCustomerMutation, getCustomerQuery, addAddressMutation, getAddressQuery };

const graphql = require("graphql");
const _ = require("lodash");
const Customer = require("../models/customer");
const Address = require("../models/address");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLID },
    fname: { type: GraphQLString },
    sname: { type: GraphQLString },
    address: {
      type: AddressType,
      resolve(parent, args) {
        //return _.find(authors, { id: parent.authorId });
        return Address.findById(parent.addressId);
      }
    }
  })
});

const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: () => ({
    id: { type: GraphQLID },
    street: { type: GraphQLString },
    suburb: { type: GraphQLString },
    code: { type: GraphQLString },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        //return _.filter(books, { authorId: parent.id });
        return Customer.find({ addressId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        //return _.find(books, { id: args.id });
        return Customer.findById(args.id);
      }
    },
    address: {
      type: AddressType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return Address.findById(args.id);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        //return books;
        return Customer.find({});
      }
    },
    addresses: {
      type: new GraphQLList(AddressType),
      resolve(parent, args) {
        //return authors;
        return Address.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAddress: {
      type: AddressType,
      args: {
        street: { type: new GraphQLNonNull(GraphQLString) },
        suburb: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let address = new Address({
          street: args.street,
          suburb: args.suburb,
          code: args.code
        });
        return address.save();
      }
    },
    addCustomer: {
      type: CustomerType,
      args: {
        fname: { type: new GraphQLNonNull(GraphQLString) },
        sname: { type: new GraphQLNonNull(GraphQLString) },
        addressId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let customer = new Customer({
          fname: args.fname,
          sname: args.sname,
          addressId: args.addressId
        });
        return customer.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

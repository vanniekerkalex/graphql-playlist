const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cross-origin requests
app.use(cors());

mongoose.connect("mongodb://shaun:test123@ds119024.mlab.com:19024/gql-ninja", { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

app.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000");
});

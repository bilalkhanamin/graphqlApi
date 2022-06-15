const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphqlSchema/schema");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
require("colors");

connectDB();

port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log("Server is started on port " + port));

import express from "express";
import {graphqlHTTP} from "express-graphql";
import schema from "./graphql/schema";
import {connect} from "./database";
import {config} from "dotenv";
import isAuth from "./middleware/is-auth";


config();

const app = express();
connect();

app.use(isAuth);

app.use('/', graphqlHTTP({
    graphiql: true,
    schema: schema
}));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server on port ${port}`));
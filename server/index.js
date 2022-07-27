const express = require('express');
const port = process.env.PORT || 4444;
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
require('dotenv').config();
const app = express();

app.use('/graphql', graphqlHTTP({
schema,
graphiql: process.env.NODE_ENV === 'development'
}))
app.listen(port, console.log(`server running on port ${port}`))
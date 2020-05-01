const express = require('express');
const { ApolloServer } = require('apollo-server-express');

let greetingMsg = "Hello World API";

const typeDefs = `
  type Query {
    greeting: String!
  }
  
  type Mutation {
    setGreetingMessage(message: String!): String
  }
`;

const resolvers = {
    Query: {
        greeting: () => greetingMsg,
    },
    Mutation: {
        setGreetingMessage,
    },
};

function setGreetingMessage(_, { message }) {
    return greetingMsg = message;
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();

app.get('/', (req, res) => {
    res.json({
        api: "greeting",
        version: "v1.0"
    }).end;
})

server.applyMiddleware({ app, path: '/graphql' });
app.listen(3000, function () {
    console.log('App started on port 3000');
});

const { ApolloServer, gql } = require('apollo-server-express')
const fs = require('fs')
const path = require('path')
const schema = fs.readFileSync(path.join(__dirname,'schema.graphql'))
const resolvers=  require('./resolvers/index')



const typeDefs = gql`
${schema}
`
async function startServer(app) {
    const graphqlServer = new ApolloServer({
      typeDefs,
      resolvers,
    })
    await graphqlServer.start()
    graphqlServer.applyMiddleware({ app })
  }

  module.exports = startServer
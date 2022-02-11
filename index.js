const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')
const startGQLserver = require('./graphql/index')

app.use(express.json())

app.use(routes)

startGQLserver(app)

app.listen(3000, () => {
  console.log('Listening on port : ', port)
})

const express = require('express')
const mongo = require('mongodb').MongoClient;
const app = express()
const port = process.env.PORT

const getCreator = () => {
  return mongo.connect('mongodb://' + process.env.MONGO_HOST)
    .then((client) => {
      const db = client.db(process.env.MONGO_DB)
      const creator = db.collection('creator')

      return creator.findOne({})
        .then((doc) => {
          client.close()
          return doc.name
        })
        .catch((err) => {
          console.log(err)
          throw err
        })
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}

app.get('/', (request, response) => {
  getCreator().then(creator => {
    response.send(creator)
  })
})

const startServer = () => {
  app.listen(port, (err) => {
    if (err) {
      return console.log('server failed to start', err)
    }

    console.log(`server is listening on ${port}`)
  })
}

// simulate migrations running
setTimeout(startServer, 10000)

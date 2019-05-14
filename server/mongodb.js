const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'

let db

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (err, client) => {
  if(err){
    return console.log('unable to connect: ', err);
  }
  db = client.db('invoice')

  db.add = () => {
    db.collection('users').insertOne({
      name: 'JaJn',
    }, (err, res) => {
      if(err) return console.log('error: ', err)
      console.log(res.ops);
    })
  }
})

module.exports = db

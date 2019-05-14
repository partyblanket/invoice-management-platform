const express = require('express');
const compression = require('compression');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const csurf = require('csurf');
const bcrypt = require('bcryptjs')
const fs = require('fs')
const pdf = require('html-pdf');

const app = express();
const server = require('http').Server(app);
const pdfTemplate = require('./templates/');
const saveToPdf = require('./handlepdf')

const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'

let db

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (err, client) => {
  if(err){
    return console.log('unable to connect: ', err);
  }
  db = client.db('invoice')
  console.log('connected to: ', db.s.databaseName);
  

})

const PORT = 3002;



app.use(compression());

app.use(bodyParser.json());

// const cookieSessionMiddleware = cookieSession({
//   secret: 'life is like a box of chocolate',
//   maxAge: 1000 * 60 * 60 * 24 * 180// 180 days
// });

// app.use(cookieSessionMiddleware)

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// app.use(csurf()); 

app.use((req, res, next) => {
  //instruct web browsers to block attempts to load the site in a frame.
  res.setHeader('x-frame-options', 'DENY');
  // res.cookie('mytoken', req.csrfToken())
  next();
});


app.post('/api/register', async (req,res) => {
    const { email, password, company } = req.body
    const hashedPassword = await hashPassword(password)
    db.collection('users').insertOne({
        email,
        hashedPassword,
        company
      }, (err, result) => {
        if(err) return console.log('error: ', err)
        console.log(result);
        
        res.json(result)
      })
})

app.post('/api/login', async (req,res) => {
    const { email, password } = req.body
    const result = await db.collection('users').findOne({
        email,
    })
    console.log(result);
    
    if(result === null) return res.json({id: null, email, status: 'not found'})
    const allowed = await checkPassword(password, result.hashedPassword)
    if (allowed) {
        res.json(result)
    }else{
        res.json({id: null, email, status: 'not allowed'})
    }
      
})

server.listen(PORT, () => console.log(`listening on ${PORT}`))

function hashPassword(plainTextPassword) {
  return new Promise(function(resolve, reject) {
      bcrypt.genSalt(function(err, salt) {
          if (err) {
              return reject(err);
          }
          bcrypt.hash(plainTextPassword, salt, function(err, hash) {
              if (err) {
                  return reject(err);
              }
              resolve(hash);
          });
      });
  });
}

function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
  return new Promise(function(resolve, reject) {
      bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
          if (err) {
              resolve
              (false);
          } else {
              resolve(doesMatch);
          }
      });
  });
}
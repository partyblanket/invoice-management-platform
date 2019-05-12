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
const db = require('./db')
const pdfTemplate = require('./templates/');
const saveToPdf = require('./handlepdf')

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
  console.log(req.session);
  // res.cookie('mytoken', req.csrfToken())
  next();
});


app.post('/api/post', (req,res) => {
    saveToPdf(pdfTemplate(req.body)).then(() => {
        res.json({succes: true})
    })
    
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
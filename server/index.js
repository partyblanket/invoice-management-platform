const express = require('express');
const path = require('path');
const savePDF = require('./handlepdf')
const bodyParser = require('body-parser')
const fs = require('fs')

const PORT = 3002;

const app = express();

app.use(express.static(path.join(__dirname, '../markup')))

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/download/:id',(req,res) => {
  console.log(req.body);
  // console.log(fs.readdirSync(path.join(__dirname, '/docs')))
  // res.download(path.join(__dirname, '/docs/pdf.pdf'),err => console.log(err))
  res.send({ok: 'success'})
  
})

app.get('/download/:id',(req,res) => {
  console.log(req.body);
  // console.log(fs.readdirSync(path.join(__dirname, '/docs')))
  res.download(path.join(__dirname, '/docs/pdf.pdf'),err => console.log(err))
  // res.send({ok: 'success'})
  
})


app.get('*', (req, res) => {
  res.send(404)
})

app.post('/upload', (req, res) => {
  console.log(req.body);
  
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))
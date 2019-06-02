const routes = require('express').Router({mergeParams: true});
const compression = require('compression');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const csurf = require('csurf');
const fs = require('fs')
const pdf = require('html-pdf');
const path = require('path')

const User = require('./db/user.model');
const Sale = require('./db/sale.model');

const {checkPassword, hashPassword} = require('./bcrypt')

const saveToPdf = require('./handlepdf')

const db = require('./db/mongoose')

db.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

routes.post('/api/register', async (req,res) => {
  const { email, password, company } = req.body
  const hashedPassword = await hashPassword(password)

  new User({
    email,
    hashedPassword,
    company,
  })
  .save((err, user) => { 
    if(err){return console.log(err)};
    console.log("user registered");
    res.json(user)
  }) 
});

routes.post('/api/updatesettings', async (req,res) => {
  const { userid, data } = req.body
  User.findByIdAndUpdate(userid,data,{new: true, useFindAndModify: false},(err, user) => {
    if(err) return res.json({succes: false})
    return res.json({success: true})
  })
})


routes.post('/api/login', async (req,res) => {
  const { email, password } = req.body
  const user = await User.findOne({email})
  
  if(user === null) return res.json({id: null, email, status: 'not found'})

  const allowed = await checkPassword(password, user.hashedPassword)
  if (allowed) {
      res.json(user)
  }else{
      res.json({id: null, email, status: 'not allowed'})
  }
})



routes.post('/api/saveinvoice', async (req,res) => {
  const {invoiceid, invoiceDets, userid, nextSale} = req.body
  if(invoiceid){
    Sale.findByIdAndUpdate(invoiceid,invoiceDets,{new: true, useFindAndModify: false},(err, sale) => {
      if(err) return res.json({succes: false})
      return res.json({success: true})
    })
  }

  if(!invoiceid){
    console.log('no userid');

    new Sale({
      ...invoiceDets,
      invoiceid: nextSale
    })
    .save((err, sale) => {
      if(err) return res.json({succes: false})
      res.json({sale})

      User.findByIdAndUpdate(userid,{$inc: {nextSale: 1}, $push: {salesIdArray: sale._id}},{new: true, useFindAndModify: false},(err, user) => {
        if(err) console.log('Error incrementing saleid/pushing salesidArray',err)
        
      })
    })
  }
})

routes.post('/api/getinvoice', async (req,res) => {
  const {userid, invoiceid} = req.body
  const sale = await Sale.findById(invoiceid)
  res.json(sale)

})

routes.post('/api/printinvoice', async (req,res) => {
  const {invoiceDets, userid, invoiceid} = req.body
  const userDets = await User.findById(userid)
  const pdf = await saveToPdf(invoiceDets, userDets,'simple')
  res.json({file: pdf})
})

routes.get('/api/fetchinvoice/:filename', (req,res) => {
  const filename = req.params.filename
  const file = path.join(__dirname,'invoices',filename+'.pdf')
  res.sendFile(file,{}, (err) => {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', filename);
    }
  })
  
})


module.exports = routes;



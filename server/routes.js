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
  console.log(req.body);
  
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
  // const userid = new ObjectID(req.body.userid)
  // const invoiceid = req.body.invoiceid ? new ObjectID(req.body.invoiceid) : null
  // const current = invoiceid ? await db.collection('sales').findOne({_id: new ObjectID(invoiceid)}) : null
  // const humaninvoiceid = req.body.invoiceid ?
  console.log(req.body);
  
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
      console.log('new sale ',sale);
      res.json({sale})

      User.findByIdAndUpdate(userid,{$inc: {nextSale: 1}, $push: {salesIdArray: sale._id}},{new: true, useFindAndModify: false},(err, user) => {
        if(err) console.log('Error incrementing saleid/pushing salesidArray',err)
        
      })
    })
  }
  //     const {insertedId} = await db.collection('sales').insertOne({
  //         ...req.body.invoiceDets
  //     })
  //             res.json({insertedId, ...req.body.invoiceDets })
  //     db.collection('users').updateOne({
  //         _id: userid
  //     },{
  //         $push: {salesIdArray: insertedId}
  //     })
  // }else{
  //     const insertedId = req.body.userid
  //     res.json({insertedId, ...req.body.invoiceDets })
  //     db.collection('sales').updateOne({
  //         _id: invoiceid
  //     },{
  //         $set:{...req.body.invoiceDets}
  //     })
  // }
})

routes.post('/api/getinvoice', async (req,res) => {
  const userid = new ObjectID(req.body.userid)
  const data = await db.collection('sales').findOne({_id: new ObjectID(req.body.invoiceid)})
  res.json({...data, templates: ['simple', 'advances']})

})

routes.post('/api/printinvoice', async (req,res) => {
  const {invoiceDets} = req.body
  const userid = new ObjectID(req.body.userid)
  const invoiceid = req.body.invoiceid ? new ObjectID(req.body.invoiceid) : null
  const userDets = await db.collection('users').findOne({_id: userid})
  
  const pdf = await saveToPdf(invoiceDets, userDets,'simple')
  res.json({file: pdf})
})

routes.get('/api/fetchinvoice/:filename', (req,res) => {
  const filename = req.params.filename
  console.log(__dirname, 'filename: ', filename);
  const file = path.join(__dirname,'invoices',filename+'.pdf')
  console.log('file: ',file);
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



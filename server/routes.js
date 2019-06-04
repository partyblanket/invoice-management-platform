const routes = require('express').Router({mergeParams: true});
const path = require('path')
const passport = require('passport');

const User = require('./db/user.model');
const Sale = require('./db/sale.model');

const saveToPdf = require('./handlepdf')

const db = require('./db/mongoose')

db.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

routes.post('/api/register', async (req,res) => {
  const { username, password, company } = req.body

  let newUser = new User({
    username,
    company,
  })
  User.register(newUser, password,(err, user) => { 
    if(err){return console.log(err)};
    console.log("user registered");
    passport.authenticate('local')(req, res, function () {
      req.session.userid = user._id
      res.json(req.session.passport);
    });
  }) 
});

routes.post('/api/updatesettings', async (req,res) => {
  const { userid, data } = req.body
  User.findByIdAndUpdate(userid,data,{new: true, useFindAndModify: false},(err, user) => {
    if(err) return res.json({succes: false})
    return res.json({success: true})
  })
})


routes.post('/api/login', passport.authenticate('local'), async (req,res) => {
  const {salesIdArray, username, company, nextSale, _id } = req.user._doc
  const saleslist = await Sale.find({owner: _id})
  req.session.userid = _id
  res.json({
    passport: req.session.passport, 
    salesIdArray, username, company, nextSale, _id, saleslist
  })
})

routes.get('/isloggedin', async (req,res) => {
  // const saleslist = await Sale.find({owner: req.session._id})
  if(req.session.passport){
    const {salesIdArray, username, company, nextSale, _id } = req.user._doc
    const saleslist = await Sale.find({owner: _id})
    console.log(saleslist);
    
    res.json({
      passport: req.session.passport, // iis passport needed here?
      salesIdArray, username, company, nextSale, _id, saleslist
    })
  }
  else {
    res.json({success: false});
  }
})

routes.post('/api/saveinvoice', async (req,res) => {
  const {invoiceid, invoiceDets, userid, nextSale} = req.body
  if(invoiceid){
    Sale.findByIdAndUpdate(invoiceid,invoiceDets,{new: true, useFindAndModify: false},(err, sale) => {
      if(err) return res.json({succes: false})
      return res.json(sale)
    })
  }

  if(!invoiceid){
    console.log('no invoiceid');
    new Sale({
      ...invoiceDets,
      owner: userid,
      invoiceid: nextSale
    })
    .save((err, sale) => {
      if(err) return res.json({succes: false})
      res.json({sale})
      User.findByIdAndUpdate(userid,{$inc: {nextSale: 1}, $push: {salesIdArray: {_id: sale._id, saleid: nextSale}}},{new: true, useFindAndModify: false},(err, user) => {
        if(err) console.log('Error incrementing saleid/pushing salesidArray',err)
        
      })
    })
  }
})

routes.get('/api/saleslist', async (req,res) => {
  console.log(req.session.userid);
  
  res.json(sales)
  
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

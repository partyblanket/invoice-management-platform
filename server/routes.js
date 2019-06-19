const routes = require('express').Router({mergeParams: true});
const path = require('path')
const passport = require('passport');

const User = require('./db/user.model');
const Sale = require('./db/sale.model');

const saveToPdf = require('./handlepdf')
const saveToDocx = require('./handledocxpdf')
const saveTemplate = require('./utils/saveTemplate')
const uploadToAWS = require('./utils/uploadToAWS')

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
  console.log(req.body);
  
  User.findByIdAndUpdate(userid,data,{new: true, useFindAndModify: false},(err, user) => {
    if(err) return res.json({succes: false})
    return res.json({success: true})
  })
})


routes.post('/api/login', passport.authenticate('local'), async (req,res) => {
  const {templateArray, username, company, nextSale, _id } = req.user._doc
  const saleslist = await Sale.find({owner: _id})
  req.session.userid = _id
  res.json({
    passport: req.session.passport, 
    username, company, nextSale, _id, saleslist, templateArray
  })
})

routes.get('/api/isloggedin', async (req,res) => {
  if(req.session.passport){
    const {templateArray, username, company, nextSale, _id } = req.user._doc
    const saleslist = await Sale.find({owner: _id})
    res.json({
      passport: req.session.passport, // iis passport needed here?
      templateArray, username, company, nextSale, _id, saleslist
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
    const user = await User.findByIdAndUpdate(userid,{$inc: {currentSale: 1}},{new: true, useFindAndModify: false})
    new Sale({
      ...invoiceDets,
      owner: userid,
      invoiceid: user.currentSale
    })
    .save((err, sale) => {
      if(err) return res.json({succes: false, error: err})
      res.json(sale)
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

routes.post('/api/printinvoicedocx', async (req,res) => {
  const {invoiceDets, userid, invoiceid, templateid} = req.body
  const userDets = await User.findById(userid)
  const filename = await saveToDocx(invoiceDets, userDets._doc,templateid)
  res.json({file: filename})
})

routes.get('/api/fetchinvoice/:filename', (req,res) => {
  const filename = req.params.filename
  const file = path.join(__dirname,'invoices',filename)
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

routes.post('/api/newtemplate', saveTemplate.single('file'), uploadToAWS, (req,res) => {
  console.log(req.body);
  
  User.findByIdAndUpdate(req.body.userid,{$push: {templateArray: {filename: req.file.filename, title: req.body.title, templateType: req.body.templateType}}},{new: true, useFindAndModify: false},(err, user) => {
    if(err) return res.json({error: err})
    res.json(user)
  })
})

module.exports = routes;

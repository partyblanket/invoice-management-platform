const mongoose = require('mongoose')

let secrets;
if (process.env.NODE_ENV === 'production') {
  secrets = process.env; // in prod the secrets are environment variables
} else {
  secrets = require('../secrets.json'); // secrets.json is in .gitignore
}

// https://cloud.mongodb.com/ to check db
const mongodb_uri = `mongodb+srv://jjb:${secrets.ATLAS_PASSWORD}@cluster0-yeytv.mongodb.net/test?retryWrites=true&w=majority`

function connect(){
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
      .then(() => {
        mongoose.connect(mongodb_uri, { useNewUrlParser: true })
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          })
      })

    }else{
      mongoose.connect(mongodb_uri, { useNewUrlParser: true })
        .then((res,err) => {
          if (err) return reject(err);
          console.log("MongoDB database connection established successfully");
          resolve();
        })
    }

  })
}

function close() {
  return mongoose.disconnect();
}


module.exports = {connect, close};
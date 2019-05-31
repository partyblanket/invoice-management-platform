const mongoose = require('mongoose')

let secrets;
if (process.env.NODE_ENV === 'production') {
  secrets = process.env; // in prod the secrets are environment variables
} else {
  secrets = require('../secrets.json'); // secrets.json is in .gitignore
}

// https://cloud.mongodb.com/ to check db
const mongodb_uri = `mongodb+srv://jjb:${secrets.ATLAS_PASSWORD}@cluster0-yeytv.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(mongodb_uri, { useNewUrlParser: true });
module.exports = mongoose.connection;
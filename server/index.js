const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('./db');

const app = express();
const server = require('http').Server(app);
const User = require('./db/user.model');

const PORT = process.env.PORT || 3002;

app.use(require('cors')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(require('express-session')({ 
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    //instruct web browsers to block attempts to load the site in a frame.
    res.setHeader('x-frame-options', 'DENY');
    next();
});

if(process.env.NODE_ENV !== 'test'){
    db.connect()
        .then(() => {
            server.listen(PORT, () => console.log(`API server listening on ${PORT}`));
        });
}

module.exports = {app};
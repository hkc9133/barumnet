const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan")
var config = require("./config"); // config.js
const sessionParser = require('express-session');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/upload', express.static('uploads'))

//create a cors middleware
app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(sessionParser({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true
}));


app.set("jwt-secret", config.secret)

var a = require('./routes/api/index.js')
app.use('/api', a);
let port = process.env.PORT || 4000;

const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
  });
    
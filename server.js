var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var multer=require('multer');

var mongoose=require("mongoose");
var db=mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME||'mongodb://localhost/form-maker');
var passport=require("passport");
var cookieParser=require('cookie-parser');
var session=require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer());
app.use(cookieParser());
app.use(session({secret:'meanstackisthebest'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world');
});
require("./public/assignment/server/app.js")(app,db);
app.listen(port, ipaddress);
//app.listen(3000);

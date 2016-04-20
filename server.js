var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var multer=require('multer');
//var passport      = require('passport');
var mongoose=require("mongoose");
var mongo_conn_string='mongodb://localhost/form-maker';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    mongo_conn_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}


var db=mongoose.connect(mongo_conn_string);
var passport=require("passport");
var cookieParser=require('cookie-parser');
var session=require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer());
var secret_key=process.env.SESSION_SECRET||process.env.OPENSHIFT_SECRET_TOKEN;
//||'cs5610formmakervikas';
app.use(session({resave: true,
    saveUninitialized: true,
    secret: secret_key}));
// passport change:
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
console.log(port);
//app.get('/hello', function(req, res){
//    res.send('hello world');
//});
require("./public/assignment/server/app.js")(app,db);
app.listen(port, ipaddress);


var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var multer=require('multer');

var mongoose=require("mongoose");
var mongo_conn_string='mongodb://localhost/form-maker';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    mongo_conn_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
//if(process.env.OPENSHIFT_MONGODB_DB_HOST) {
//    mongo_conn_string = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/';
//}
var db=mongoose.connect(mongo_conn_string);
var passport=require("passport");
var cookieParser=require('cookie-parser');
var session=require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer());
app.use(cookieParser());
app.use(session({secret:'meanstackisthebest'}));
app.use(passport.initialize());
app.use(passport.session(
    {resave: true,
    saveUninitialized: true,
    secret: process.env.PASSPORT_SECRET}
));
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world');
});
require("./public/assignment/server/app.js")(app,db);
app.listen(port, ipaddress);
//app.listen(3000);

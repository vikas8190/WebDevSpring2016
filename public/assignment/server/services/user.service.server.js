/**
 * Created by vilas on 18-03-2016.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports=function(app,userModel){

    var auth = authorized;

    app.post  ('/api/assignment/user/login', passport.authenticate('local'), login);
    app.get('/api/assignment/user/loggedin',loggedin);
    app.get('/api/assignment/user/logged_in',logged_in);
    app.post  ('/api/assignment/user/register',register);
    app.post('/api/assignment/user/logout', logout);
    app.post('/api/assignment/user',auth,createUser);
    app.get('/api/assignment/user',auth,getAllUsers);
    app.get('/api/assignment/user/:id',auth,getUserByID);
    app.put('/api/assignment/user/:id',auth,updateUserByID);
    app.delete('/api/assignment/user/:id',auth,deleteUserByID);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserByID(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function createUser(req,res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function getAllUsers(req,res) {
        if(isAdmin(req.user)) {
        if(req.query.username&&req.query.password){
            var credentials={
                username:req.query.username,
                password:req.query.password
            };
            userModel.findUserByCredentials(credentials)
                .then(
                    function (doc) {
                        req.session.currentUser = doc;
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        else if(req.query.username){
            var username=req.query.username;
            userModel.findUserByUsername(username)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        else{
            res.json(userModel.findAllUsers());
        }
        }
        else{
            res.status(403);
        }
    }


    function getUserByID(req,res) {
        var userID=req.params.id;
        userModel.findUserByID(userID)
            .then(function(doc){
                res.json(doc);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function updateUserByID(req,res) {
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUserByID(req.params.id, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserByID(req,res) {
        if(isAdmin(req.user)) {
            userModel
                .deleteUserByID(req.params.id)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    /*function getUserByCredentials(req,res) {
        var credentials={
            username:req.query.username,
            password:req.query.password
        };
        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
    function getUserByUsername(req,res) {
        var username=req.query.username;
        userModel.findUserByUsername(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }*/

    function logged_in(req,res) {
        var user=req.user;
        if(!user) {
            res.json(null);
        }else{
            res.json(user);
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        console.log("register called");
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    console.log("user here");
                    console.log(user);
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

}
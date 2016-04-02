/**
 * Created by vilas on 18-03-2016.
 */
module.exports=function(app,userModel){
    app.get('/api/assignment/user/logged_in',loggedIn);
    app.post('/api/assignment/user/logout', logout);
    app.post('/api/assignment/user',createUser);
    app.get('/api/assignment/user',getAllUsers);
    app.get('/api/assignment/user/:id',getUserByID);
    app.put('/api/assignment/user/:id',updateUserByID);
    app.delete('/api/assignment/user/:id',deleteUserByID);


    function createUser(req,res) {
        var user=req.body;
        userModel.createUser(user)
            .then(function(doc){
                req.session.currentUser=doc;
                res.json(doc);
            },
            function(err){
                res.json(400).send(err);
            });
    }

    function getAllUsers(req,res) {
        var users=null;
        if(req.query.username&&req.query.password){
            var credentials={
                username:req.query.username,
                password:req.query.password
            };
            userModel.findUserByCredentials(credentials)
                .then(
                    function (doc) {
                        console.log("user details");
                        console.log(doc);
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
                        console.log("found user returning");
                        console.log(doc);
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
        var userID=req.params.id;
        var user=req.body;
        userModel.updateUserByID(userID, user)
            .then(
                function (doc) {
                    if(!doc) {
                        res.status(400).send('Update Error');
                    } else {
                        console.log("updated success");
                        console.log(doc);
                        req.session.currentUser.password=user.password;
                        req.session.currentUser.firstName=user.firstName;
                        req.session.currentUser.lastName=user.lastName;
                        req.session.currentUser.emails=user.emails;
                        req.session.currentUser.phones=user.phones;
                        res.status(200).send('Update Success');
                    }
                }
            );
    }

    function deleteUserByID(req,res) {
        var userID=req.params.id;
        userModel.deleteUserByID(userID)
            .then(
                function (err) {
                    if(err) {
                        res.status(400).send(err);
                    }
                    else {
                        res.status(200).send('User deleted');
                    }
                }
            );
    }

    function getUserByCredentials(req,res) {
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
    }

    function loggedIn(req,res) {
        console.log("in loggedin function");
        console.log(req.session.currentUser);
        if(!req.session.currentUser) {
            req.session.currentUser = null;
        }
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

}
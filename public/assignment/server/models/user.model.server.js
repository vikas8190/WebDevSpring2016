/**
 * Created by vilas on 17-03-2016.
 */
var mongoose = require("mongoose");
var q = require("q");
module.exports=function($q){

    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api={
        createUser:createUser,
        findAllUsers:findAllUsers,
        findUserByID:findUserByID,
        updateUserByID:updateUserByID,
        deleteUserByID:deleteUserByID,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername:findUserByUsername
    };
    return api;


    function findAllUsers() {
        var deferred=q.defer();
        User.find(
            function(err,users){
                if(!err){
                    deferred.resolve(users);
                }else{
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findUserByID(userID) {
        var deferred=q.defer();
        User.findById(
            {_id:userID},
            function(err,users){
                if(!err){
                    deferred.resolve(users);
                }else{
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function deleteUserByID(userID) {
        var deferred=q.defer();
        User.remove(
            {_id:userID},
            function(err,stats){
                if(!err){
                    deferred.resolve(stats);
                }else{
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function createUser(user) {
        console.log("creating user:");
        console.log(user);
        var deferred=q.defer();
        User.create(
            user,
            function(err,stats){
                if(!err){
                    console.log("create resolved");
                    console.log(stats);
                    deferred.resolve(stats);
                }else{
                    console.log("create rejected");
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function updateUserByID(userID,user) {
        console.log("update user model");
        console.log(userID);
        console.log(user);
        var deferred = q.defer();
        User
            .update (
                {_id: userID},
                {$set: user},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findUserByUsername(username) {
        console.log("find user by username model");
        console.log(username);
        var deferred = q.defer ();
        User
            .findOne (
                {username: username},
                function (err, user) {
                    if (!err) {
                        console.log("find resolved");
                        console.log(user);
                        deferred.resolve(user);
                    } else {
                        console.log("find rejected");
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        console.log("credentals");
        console.log(credentials);
        var deferred = q.defer ();
        User
            .findOne (
                {username: credentials.username,password:credentials.password},
                function (err, user) {
                    if (!err) {
                        console.log("user found in DB");
                        console.log(user);
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }
}

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

    function filterUsers(user,userID){
        return user._id!=userID;
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
        var deferred=q.defer();
        User.create(
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

    function updateUserByID(userID,user) {
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
        var deferred = q.defer ();
        User
            .findOne (
                {username: username},
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }
    function findUserByCredentials(credentials) {
        var deferred = q.defer ();
        User
            .findOne (
                {username: username},
                {password: password},
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }
}

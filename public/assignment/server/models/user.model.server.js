/**
 * Created by vilas on 17-03-2016.
 */
var mongoose = require("mongoose");
module.exports=function(){

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
        return User.find();
    }

    function findUserByID(userID) {
        return User.findById(userID);
    }

    function deleteUserByID(userID) {
        return User.remove(userID);
    }

    function createUser(user) {
        return User.create(user);
    }

    function updateUserByID(userID,user) {
        return User.findByIdAndUpdate(userID, {$set: user});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserByCredentials(credentials) {
        return User.findOne ({username: credentials.username,password:credentials.password});
    }

}

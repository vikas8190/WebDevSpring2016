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
        console.log("remove user id");
        console.log(userID);
        //return User.remove(userID);
        return User.remove({"_id":userID});
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
        console.log(credentials.username);
        console.log(credentials.password);
        return User.findOne ({username: credentials.username,password:credentials.password});
    }

}

/**
 * Created by vilas on 17-03-2016.
 */
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var q = require("q");
var SALT_WORK_FACTOR=10;
module.exports=function(){

    var UserSchema = require("./user.schema.server.js")();

    /*UserSchema.pre('save', function(next) {
        var user = this;

        console.log("invoked pre save for password");
        console.log(user.isModified('password'));
        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });*/
    /*UserSchema.pre('save',encrypt_password);
    UserSchema.pre('update',encrypt_password);
    function encrypt_password(next){
        var user = this;

        console.log("invoked pre save for password");
        console.log(user);
        console.log(user.isModified('password'));
        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    }*/

    UserSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };

    var User = mongoose.model("User", UserSchema);

    var api={
        createUser:createUser,
        findAllUsers:findAllUsers,
        findUserByID:findUserByID,
        updateUserByID:updateUserByID,
        deleteUserByID:deleteUserByID,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername:findUserByUsername,
        password_encrypt:password_encrypt
    };
    return api;


    function findAllUsers() {
        return User.find();
    }

    function findUserByID(userID) {
        return User.findById(userID);
    }

    function deleteUserByID(userID) {
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

    function password_encrypt(password){
        var deferred= q.defer();
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) deferred.reject(err);

            // hash the password using our new salt
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) deferred.reject(err);

                // override the cleartext password with the hashed one
                deferred.resolve(hash);
            });
        });
        return deferred.promise;
    }

}

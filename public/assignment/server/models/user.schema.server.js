/**
 * Created by vilas on 30-03-2016.
 */
var mongoose = require("mongoose");

module.exports = function () {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email :String,
        phones : [String]
    }, {collection: 'user'});
    return UserSchema;
};

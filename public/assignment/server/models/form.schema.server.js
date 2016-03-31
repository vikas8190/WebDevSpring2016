/**
 * Created by vilas on 30-03-2016.
 */
var mongoose = require("mongoose");

module.exports = function () {
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: Date,
        updated : Date
    }, {collection: 'form'});
    return FormSchema;
};

/**
 * Created by vilas on 17-03-2016.
 */
var mongoose = require("mongoose");
var q = require("q");

module.exports=function(){
    var FormSchema = require("./form.schema.server.js")();
    var Form = mongoose.model("Form", FormSchema);
    var api={
        createFormForUser:createFormForUser,
        findAllFormForUser:findAllFormForUser,
        findFormByID:findFormByID,
        updateFormByID:updateFormByID,
        deleteFormByID:deleteFormByID,
        findFormByTitle:findFormByTitle,
        findAllFormFieldsForFormID:findAllFormFieldsForFormID,
        getMongooseModel:getMongooseModel
    };
    return api;

    function getMongooseModel() {
        return Form;
    }

    function createFormForUser(userID,form) {
        var newForm= {
            title:form.title,
            userId:userID,
            fields:form.fields
        };
        console.log("creating form:");
        console.log(newForm);
        var deferred= q.defer();
        Form.create(newForm,function(err,stats){
            if(err){
                deferred.reject(err);
            }else{
                console.log("created form");
                console.log(stats);
                deferred.resolve(stats);
            }
        });

        return deferred.promise;
    }

    function findAllFormForUser(userID) {
        var deferred = q.defer ();
        Form.find (
            {userId:userID},
            function (err, forms) {
                if (!err) {
                    deferred.resolve (forms);
                } else {
                    deferred.reject (err);
                }
            }
        );
        return deferred.promise;
    }

    function findFormByID(formID) {
        var deferred=q.defer();
        Form.findById(
            {_id:formID},
            function(err,forms){
                if(!err){
                    deferred.resolve(forms);
                }else{
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function deleteFormByID(formID) {
        var deferred = q.defer();
        Form
            .remove (
                {_id: formID},
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


    function updateFormByID(formID,form) {
        var deferred = q.defer();
        /*Form
            .update (
                {_id: formID},
                {$set: form},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );*/
        Form
            .findByIdAndUpdate (
                formID, newForm, {new: true},
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

    function findFormByTitle(title) {
        var deferred = q.defer ();
        Form
            .findOne (
                {title: title},
                function (err, Form) {
                    if (!err) {
                        deferred.resolve(Form);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function findAllFormFieldsForFormID(formID){
        var deferred= q.defer();
        Form.findOne(
            {_id:formID},
            function(err,Form){
                if(!err){
                    deferred.resolve(Form.fields);
                } else{
                    deferred.reject(err);
                }
            }
        )
        return deferred.promise;
    }
}


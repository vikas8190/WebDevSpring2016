/**
 * Created by vilas on 18-03-2016.
 */
module.exports=function(app,formModel){
    app.get('/api/assignment/form/:formID/field',getAllFieldsForFormID);
    app.get('/api/assignment/form/:formID/field/:fieldID',getFormFieldByID);
    app.delete('/api/assignment/form/:formID/field/:fieldID',deleteFormFieldByID);
    app.post('/api/assignment/form/:formID/field',duplicateFormField);
    app.put('/api/assignment/form/:formID/field/:fieldID',updateFormFieldByID);

    var fieldModel   = require("../models/field.model.server.js")(formModel);

    function getAllFieldsForFormID(req,res) {
        var formID=req.params.formID;
        console.log("get all fields for form id:");
        formModel.findAllFormFieldsForFormID(formID)
            .then(function(fields){
                    console.log("returning response");
                    res.json(fields);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function getFormFieldByID(req,res) {
        var formID=req.params.formID;
        var fieldID=req.params.fieldID;
        fieldModel.findFormFieldByID(formID,fieldID)
            .then(function(field){
                    console.log("returning response");
                    res.json(field);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteFormFieldByID(req,res) {
        var formID=req.params.formID;
        var fieldID=req.params.fieldID;
        fieldModel.deleteFormFieldByID(formID,fieldID)
            .then(function(field){
                    console.log("returning response");
                    res.json(field);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function duplicateFormField(req,res) {
        var formID = req.params.formID;
        var field=req.body;
        fieldModel.createFormField(formID,field)
            .then(function(field){
                    console.log("returning response");
                    res.json(field);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function updateFormFieldByID(req,res) {
        var formID = req.params.formID;
        var fieldID=req.params.fieldID;
        var field=req.body;
        fieldModel.updateFormFieldByID(formID,fieldID,field)
            .then(function(field){
                    console.log("returning response");
                    res.json(field);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
}
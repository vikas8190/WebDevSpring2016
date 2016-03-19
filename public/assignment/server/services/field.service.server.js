/**
 * Created by vilas on 18-03-2016.
 */
module.exports=function(app,formModel){
    app.get('/api/assignment/form/:formID/field',getAllFieldsForFormID);
    app.get('/api/assignment/form/:formID/field/:fieldID',getFormFieldByID);
    app.delete('/api/assignment/form/:formID/field/:fieldID',deleteFormFieldByID);
    app.post('/api/assignment/form/:formID/field',duplicateFormField);
    app.put('/api/assignment/form/:formID/field/:fieldID',updateFormFieldByID);

    function getAllFieldsForFormID(req,res) {
        var formID=req.params.formID;
        var fieldList=formModel.findAllFormFieldsForFormID(formID);
        res.json(fieldList);
    }

    function getFormFieldByID(req,res) {
        var formID=req.params.formID;
        var fieldID=req.params.fieldID;
        var formField=formModel.findFormFieldByID(formID,fieldID);
        res.json(formField);
    }

    function deleteFormFieldByID(req,res) {
        var formID=req.params.formID;
        var fieldID=req.params.fieldID;
        var fieldList=formModel.deleteFormFieldByID(formID,fieldID);
        res.json(fieldList);
    }

    function duplicateFormField(req,res) {
        var formID = req.params.formID;
        var field=req.body;
        var newFormField=formModel.createFormField(formID,field);
        res.json(newFormField);
    }
    function updateFormFieldByID(req,res) {
        var formID = req.params.formID;
        var fieldID=req.params.fieldID;
        var field=req.body;
        var updatedField=formModel.updateFormFieldByID(formID,fieldID,field);
        res.json(updatedField);
    }
}
/**
 * Created by vilas on 18-03-2016.
 */
module.exports=function(app,formModel){
    app.get('/api/assignment/form/:userID/form',getAllFormForUserID);
    app.get('/api/assignment/form/:formID',getFormByID);
    app.delete('/api/assignment/form/:formID',deleteFormByID);
    app.post('/api/assignment/user/:userID/form',createForm);
    app.post('/api/assignment/form',createForm);
    app.put('/api/assignment/form/:formID',updateFormByID);

    function getAllFormForUserID(req,res) {
        var userID=req.params.userID;
        var forms=formModel.findAllFormForUser(userID);
        res.json(forms);
    }
    function getFormByID(req,res) {
        var formID=req.params.formID;
        var form=formModel.findFormByID(formID);
        res.json(form);
    }
    function deleteFormByID(req,res) {
        var formID=req.params.formID;
        var forms=formModel.deleteFormByID(formID);
        res.json(forms);
    }
    function createForm(req,res) {
        var userID = req.params.userID;
        var form=req.body;
        var newForm=formModel.createFormForUser(userID,form);
        res.json(newForm);
    }
    function updateFormByID(req,res) {
        var formID = req.params.formID;
        var form=req.body;
        var updatedForm=formModel.updateFormByID(formID,form);
        res.json(updatedForm);
    }
}
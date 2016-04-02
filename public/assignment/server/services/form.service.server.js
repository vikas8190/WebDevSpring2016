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
        formModel.findAllFormForUser(userID)
            .then(function(forms){
                    console.log("returning response");
                    res.json(forms);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
    function getFormByID(req,res) {
        console.log("get form by id");
        var formID=req.params.formID;
        var form=formModel.findFormByID(formID);
        formModel.findFormByID(formID)
            .then(function(form){
                    console.log("returning response");
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteFormByID(req,res) {
        var formID=req.params.formID;
        var forms=formModel.deleteFormByID(formID);
        formModel.deleteFormByID(formID)
            .then(function(form){
                    console.log("returning response");
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function createForm(req,res) {
        var userID = req.params.userID;
        var form=req.body;
        formModel.createFormForUser(userID,form)
            .then(function(form){
                console.log("returning response");
                res.json(form);
            },
            function(err){
                res.status(400).send(err);
            });
    }
    function updateFormByID(req,res) {
        console.log("update form by id in server");
        var formID = req.params.formID;
        var form=req.body;
        console.log(formID);
        console.log(form);
        formModel.updateFormByID(formID,form)
            .then(function(updatedform){
                    console.log("returning response");
                    console.log(updatedform);
                    res.json(updatedform);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
}
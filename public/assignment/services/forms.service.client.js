/**
 * Created by vilas on 20-02-2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);
    function FormService(){
        var forms;
        forms=[
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];
        var service={
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };
        return service;
        function createFormForUser(userId, form, callback){
            var newform={"_id": "0", "title": "default", "userId": 1};
            newform._id=(new Date).getTime();
            newform.userId=userId;
            newform.title=form.title;
            forms.push(newform);
            callback(forms);
        }
        function findAllFormsForUser(userId,callback){
            console.log("search for userid:");
            console.log(userId);
            var cur_forms=forms.filter(function(f){
                return (f.userId===userId);
            });
            console.log("cur forms:")
            console.log(cur_forms);
            callback(cur_forms);
        }
        function deleteFormById(formId,callback){
            for(var i=0;i<forms.length;i++){
                if(forms[i]._id==formId){
                    forms.splice(i,1);
                    break;
                }
            }
            callback(forms);
        }
        function updateFormById(formId, newForm, callback){
            console.log("cur forms for user:");
            console.log(forms);
            console.log("size:");
            console.log(forms.length);
            for(var i=0;i<forms.length;i++){
                if(forms[i]._id==formId){
                    forms[i].title=newForm.title;
                    break;
                }
            }
            callback(forms);
        }
    }
})();

/**
 * Created by vilas on 20-02-2016.
 */
(function(){
    "use strict";
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
            var newform={"_id": (new Date).getTime(),
                "title": form.title,
                "userId": userId};
            forms.push(newform);
            callback(forms);
        }
        function findAllFormsForUser(userId,callback){
            var cur_forms=forms.filter(function(f){
                return (f.userId===userId);
            });
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

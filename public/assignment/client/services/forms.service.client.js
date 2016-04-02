/**
 * Created by vilas on 20-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);
    function FormService($http){
        var service={
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById,
            getFormByID:getFormByID
        };
        return service;
        function createFormForUser(userId, form){
            return $http.post("/api/assignment/user/"+userId+"/form",form);
        }
        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/form/"+userId+"/form");
        }
        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/"+formId);
        }
        function updateFormById(formId, newForm){
            return $http.put("/api/assignment/form/"+formId,newForm);
        }
        function getFormByID(formID){
            return $http.get("/api/assignment/form/"+formID);
        }
    }
})();

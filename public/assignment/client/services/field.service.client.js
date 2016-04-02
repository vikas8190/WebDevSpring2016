/**
 * Created by vilas on 20-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService",FieldService);
    function FieldService($http){
        var service={
            createFieldForForm:createFieldForForm,
            getFieldsForForm:getFieldsForForm,
            getFieldForForm:getFieldForForm,
            deleteFieldFromForm:deleteFieldFromForm,
            updateField:updateField
        };
        return service;

        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/"+formId+"/field",field);
        }
        function getFieldsForForm(formId){
            return $http.get("/api/assignment/form/"+formId+"/field");
        }
        function getFieldForForm(formId,fieldID){
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldID);
        }
        function deleteFieldFromForm(formId, fieldID){
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldID);
        }
        function updateField(formId, fieldID,field){
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldID,field);
        }
    }
})();

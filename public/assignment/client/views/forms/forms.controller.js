/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);
    function FormController($scope,$rootScope,FormService,$location){
        var selectedForm=null;
        var m=this;
        function init(){
            $scope.loadFormFields=loadFormFields;
            $scope.deleteForm=deleteForm;
            $scope.updateForm=updateForm;
            $scope.addForm=addForm;
            $scope.selectForm=selectForm;
            $scope.selectedForm=selectedForm;
            if($rootScope.user!=null) {
                FormService.findAllFormsForUser($rootScope.user._id)
                    .then(function (res) {
                        $scope.forms = res.data;
                        m.myForms=res.data;
                    });
            }
            else{
                $scope.$location.path("/home");
            }
        }
        init();

        function deleteForm(formid){
            FormService.deleteFormById(formid)
                .then(function(res) {
                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(res){
                            $scope.forms = res.data;
                        });
                });
        }
        function updateForm(form){
            if($scope.selectedForm!=null) {
                FormService
                    .updateFormById(
                        $scope.selectedForm._id,
                        form
                    )
                    .then(function(response){
                        FormService
                            .findAllFormsForUser($rootScope.user._id)
                            .then(function(res){
                                $scope.forms = res.data;
                            });
                    });
            }
        }
        function addForm(form){
            FormService
                .createFormForUser(
                    $rootScope.user._id,
                    form
                )
                .then(function(res) {
                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(res){
                            $scope.forms = res.data;
                        });
                });
        }
        function selectForm(form){
            $scope.selectedForm=form;
            $scope.inputform={
                title:form.title};
        }
        function loadFormFields(formID){
            $location.url("form/"+formID+"/fields");
        }
    }
})();

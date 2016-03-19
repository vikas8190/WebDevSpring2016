/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);
    function FormController($scope,$rootScope,FormService){
        var selectedForm=null;
        var m=this;
        function init(){
            console.log("init called !!");
            $scope.renderform=renderform;
            $scope.deleteForm=deleteForm;
            $scope.updateForm=updateForm;
            $scope.addForm=addForm;
            $scope.selectForm=selectForm;
            $scope.selectedForm=selectedForm;
            if($rootScope.user!=null) {
                console.log("rootscope user:");
                console.log($rootScope.user);
                FormService.findAllFormsForUser($rootScope.user._id)
                    .then(function (res) {
                        console.log("new form list");
                        $scope.forms = res.data;
                        for(var form in $scope.forms){
                            console.log(form);
                        }
                        m.myForms=res.data;
                        console.log($scope.forms);
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
                            console.log(res);
                            $scope.forms = res.data;
                        });
                });
        }
        function updateForm(form){
            if($scope.selectedForm!=null) {
                console.log("selected form is");
                console.log($scope.selectedForm);
                FormService
                    .updateFormById(
                        $scope.selectedForm._id,
                        form
                    )
                    .then(function(response){
                        console.log(response);
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
                    console.log(res);
                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(res){
                            console.log(res);
                            $scope.forms = res.data;
                        });
                });
        }
        function selectForm(form){
            $scope.selectedForm=form;
            $scope.inputform={
                title:form.title};
        }
        function renderform(forms){
            $scope.forms=forms;
        }
    }
})();

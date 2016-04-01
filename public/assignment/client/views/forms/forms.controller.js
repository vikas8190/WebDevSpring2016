/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);
    function FormController($rootScope,FormService,$location){

        var vm=this;
        function init(){
            vm.selectedForm=null;
            vm.loadFormFields=loadFormFields;
            vm.deleteForm=deleteForm;
            vm.updateForm=updateForm;
            vm.addForm=addForm;
            vm.selectForm=selectForm;
            if($rootScope.currentUser!=null) {
                FormService.findAllFormsForUser($rootScope.currentUser._id)
                    .then(function (res) {
                        vm.forms = res.data;
                        vm.myForms=res.data;
                    });
            }
            else{
                vm.$location.path("/home");
            }
        }
        init();

        function deleteForm(formid){
            FormService.deleteFormById(formid)
                .then(function(res) {
                    FormService
                        .findAllFormsForUser($rootScope.currentUser._id)
                        .then(function(res){
                            vm.forms = res.data;
                        });
                });
        }
        function updateForm(form){
            if(vm.selectedForm!=null) {
                FormService
                    .updateFormById(
                        vm.selectedForm._id,
                        form
                    )
                    .then(function(response){
                        FormService
                            .findAllFormsForUser($rootScope.currentUser._id)
                            .then(function(res){
                                vm.forms = res.data;
                            });
                    });
            }
        }

        function addForm(form){
            console.log("add form called:");
            console.log(form);
            FormService
                .createFormForUser(
                    $rootScope.currentUser._id,
                    form
                )
                .then(function(res) {
                    console.log("finding all forms for user:");
                    FormService
                        .findAllFormsForUser($rootScope.currentUser._id)
                        .then(function(res){
                            vm.forms = res.data;
                        });
                });
        }

        function selectForm(form){
            vm.selectedForm=form;
            vm.inputform={
                title:form.title};
        }

        function loadFormFields(formID){
            console.log("loading fields for the form:");
            $location.url("form/"+formID+"/fields");
        }
    }
})();

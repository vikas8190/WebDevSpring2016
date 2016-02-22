/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);
    function FormController($scope,$rootScope,FormService){
        console.log($rootScope.user._id);
        findForms();
        var selectedForm=null;
        $scope.renderform=renderform;
        $scope.deleteForm=deleteForm;
        $scope.updateForm=updateForm;
        $scope.addForm=addForm;
        $scope.selectForm=selectForm;
        $scope.selectedForm=selectedForm;
        function findForms(){
            FormService.findAllFormsForUser($rootScope.user._id,renderform);
        }
        function deleteForm(formid){
            FormService.deleteFormById(formid,findForms);
        }
        function updateForm(form){
            FormService.updateFormById($scope.selectedForm._id,form,findForms);
        }
        function addForm(form){
            FormService.createFormForUser($rootScope.user._id,form,findForms);
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

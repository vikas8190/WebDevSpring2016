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
        $scope.renderform=renderform;
        $scope.deleteForm=deleteForm;
        function findForms(){
            FormService.findAllFormsForUser($rootScope.user._id,renderform);
        }
        function deleteForm(formid){
            FormService.deleteFormById(formid,findForms);
        }
        function form_after_del(forms){
            $scope.forms=forms;
        }
        function renderform(forms){
            console.log(forms);
            $scope.forms=forms;
        }
    }
})();

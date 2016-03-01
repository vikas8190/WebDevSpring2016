/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);
    function FieldController($scope,$location){
        $scope.$location=$location;
    }
})();

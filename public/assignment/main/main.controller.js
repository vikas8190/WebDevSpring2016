/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("MainController",MainController);
    function MainController($scope,$location,$route){
        $scope.$location=$location;
        $scope.$route=$route;
        $scope.$location.path("/home");
    }
})();

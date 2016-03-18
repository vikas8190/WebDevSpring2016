/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HomeController",HomeController);
    function HomeController($scope,$rootScope,$location){
        $scope.$location=$location;
    }
})();
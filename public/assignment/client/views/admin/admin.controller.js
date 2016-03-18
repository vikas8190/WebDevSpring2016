/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);
    function AdminController($scope,$rootScope,$location){
        if($rootScope.user==null)
        {
            $scope.$location.path("/home");
        }
    }
})();

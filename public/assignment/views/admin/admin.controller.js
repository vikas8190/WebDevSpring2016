/**
 * Created by vilas on 17-02-2016.
 */
(function(){
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

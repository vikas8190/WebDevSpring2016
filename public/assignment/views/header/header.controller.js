/**
 * Created by vilas on 22-02-2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);
    function HeaderController($scope,$rootScope,$location){
        $scope.$location=$location;
        $scope.logout=logout;
        function logout(user){
            $rootScope.user=null;
            $scope.$location.path("/home");
        }
    }
})();


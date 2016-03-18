/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$timeout,$rootScope,UserService){
        $scope.register=register;

        function register(user){
            UserService.createUser(user,redirect);
        }
        function redirect(user){
            if(user) {
                $scope.SuccessAlert=true;
                $timeout(function(){
                    $scope.SuccessAlert=false;
                },2000);
                $rootScope.user = user;
                $scope.$location.path("/profile");
            }
        }
    }
})();

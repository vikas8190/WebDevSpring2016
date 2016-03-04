/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);
    function LoginController($scope,$timeout,$rootScope,UserService){
        $scope.login=login;

        //event handler implementations:
        function login(user) {
            if(user) {
                UserService.findUserByCredentials(user.username, user.password, login_user);
            }
            function login_user(user)
            {
                if(user) {
                    $rootScope.user = user;
                    $scope.$location.path("/profile");
                }
                else {
                    $scope.errorMessage="Invalid Password!!";
                    $timeout(function(){
                        $scope.errorMessage=false;
                    },2000);
                }
            }
        }
    }
})();
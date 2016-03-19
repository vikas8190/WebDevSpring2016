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
                UserService.findUserByCredentials(
                    user.username, user.password)
                    .then(function(res){
                        console.log(res);
                        if(res.data){
                            $rootScope.user = res.data;
                            //UserService.setCurrentUser(res.data);
                            console.log("setting logged in user:");
                            console.log(res.data);
                            $scope.$location.path("/profile");
                        }
                        else {
                            $scope.errorMessage="Invalid Password!!";
                            $timeout(function(){
                                $scope.errorMessage=false;
                            },2000);
                        }
                    });
            }

        }
    }
})();
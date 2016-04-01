/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);
    function LoginController($scope,$timeout,UserService){
        var vm=this;

        vm.login=login;

        //event handler implementations:
        function login(user) {
            console.log("logiging in for user:");
            if(user) {
                UserService.findUserByCredentials(
                    user.username, user.password)
                    .then(function(res){
                        console.log(res);
                        if(res.data){
                            UserService.setCurrentUser(res.data);
                            $scope.$location.path("/profile");
                        }
                        else {
                            $scope.errorMessage="Invalid Username/Password!!";
                            $timeout(function(){
                                $scope.errorMessage=false;
                            },2000);
                        }
                    });
            }

        }
    }
})();
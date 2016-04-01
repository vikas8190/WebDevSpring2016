/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$timeout,UserService){
        var vm=this;
        vm.register=register;

        function register(user){
            console.log("register called");
            UserService.createUser(user)
                .then(function(response){
                    console.log("finding user");
                    UserService.findUserByUsername(user.username)
                        .then(function (newUser) {
                            console.log("new user:");
                            console.log(newUser);
                            if(newUser) {
                                console.log("new user found:");
                                console.log(newUser);
                                $scope.SuccessAlert = true;
                                $timeout(function () {
                                    $scope.SuccessAlert = false;
                                }, 2000);
                                vm.user = newUser.data;
                                console.log("redirecting");
                                $scope.$location.path("/profile");
                            }
                        })
                    })
            }
    }
})();

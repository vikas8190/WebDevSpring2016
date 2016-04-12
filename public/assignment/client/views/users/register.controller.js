/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location,$timeout,UserService){
        var vm=this;
        vm.register=register;

        function register(user){
            if(user.password==user.verifypassword) {
                UserService.register(user)
                    .then(function (response) {
                        console.log("response");
                        console.log(response);
                        var user = response.data;
                        if (user != null) {
                            UserService.setCurrentUser(user);
                            vm.SuccessAlert = true;
                            $timeout(function () {
                                vm.SuccessAlert = false;
                                vm.user = user;
                                $location.path("/profile");
                            }, 1000);
                        }
                    },
                        function (err) {
                            $scope.error = err;
                        });
            }
            else{
                vm.ErrorAlert = true;
                $timeout(function () {
                    vm.ErrorAlert = false;
                }, 1000);
            }
        }
    }
})();

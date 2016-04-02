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
                UserService.createUser(user)
                    .then(function (response) {
                        UserService.findUserByUsername(user.username)
                            .then(function (newUser) {
                                if (newUser) {
                                    vm.SuccessAlert = true;
                                    $timeout(function () {
                                        vm.SuccessAlert = false;
                                        vm.user = newUser.data;
                                        $location.path("/profile");
                                    }, 1000);
                                }
                            })
                    })
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

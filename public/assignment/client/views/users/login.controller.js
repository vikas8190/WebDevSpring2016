/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);
    function LoginController($location,$timeout,UserService){
        var vm=this;

        vm.login=login;

        //event handler implementations:
        function login(user) {
            if(user) {
                UserService.login(
                    user)
                    .then(function(response){
                        if(response.data){
                            UserService.setCurrentUser(response.data);
                            $location.path("/profile");
                        }
                        else {
                            vm.errorMessage="Invalid Username/Password!!";
                            $timeout(function(){
                                vm.errorMessage=false;
                            },2000);
                        }
                    });
            }

        }
    }
})();
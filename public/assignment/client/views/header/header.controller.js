/**
 * Created by vilas on 22-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);
    function HeaderController($rootScope,$location,UserService){
        var vm=this;
        function init() {
            vm.$location = $location;
        }
        init();
        vm.logout = logout;
        function logout(user){
            console.log("called logout");
            UserService.logout()
                .then(function(response) {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
            });
        }
    }
})();


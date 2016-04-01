/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HomeController",HomeController);
    function HomeController($rootScope,$location,UserService){
        var vm=this;
        function init() {
            vm.$location = $location;
            UserService.getCurrentUser()
                .then(function(response){
                    console.log(response.data);
                    UserService.setCurrentUser(response.data);
                });
            console.log("home controlleer init");
        }
        init();
    }
})();
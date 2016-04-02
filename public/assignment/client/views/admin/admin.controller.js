/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);
    function AdminController($rootScope,$location){
        var vm=this;
        if($rootScope.user==null)
        {
            $location.path("/home");
        }
    }
})();

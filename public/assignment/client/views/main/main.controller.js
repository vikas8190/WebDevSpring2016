/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("MainController",MainController);
    function MainController($location){
        var vm=this;
        function init() {
            $location.path("/home");
        }
        init();
    }
})();

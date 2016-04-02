/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);
    function SidebarController($location)
    {
        var vm=this;
        function init() {
            vm.$location = $location;
        }
        init();
    }
})();
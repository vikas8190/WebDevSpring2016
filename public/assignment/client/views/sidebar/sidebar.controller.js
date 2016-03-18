/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);
    function SidebarController($scope,$location)
    {
        $scope.location=$location;
    }
})();
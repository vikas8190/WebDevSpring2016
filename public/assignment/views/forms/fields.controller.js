/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);
    function FieldController($scope,$location){
        $scope.$location=$location;
    }
})();

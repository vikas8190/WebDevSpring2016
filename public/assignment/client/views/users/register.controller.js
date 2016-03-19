/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$timeout,$rootScope,UserService){
        $scope.register=register;

        function register(user){
            UserService.createUser(user)
                .then(function(res){
                    console.log(res);
                    if(res.data){
                        $scope.SuccessAlert=true;
                        $timeout(function(){
                            $scope.SuccessAlert=false;
                        },2000);
                        $rootScope.user = res.data;
                        $scope.$location.path("/profile");
                    }
                })
        }
    }
})();

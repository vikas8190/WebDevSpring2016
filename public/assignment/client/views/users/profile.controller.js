/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);
    function ProfileController($scope,$rootScope,$timeout,UserService){
        if($scope.user==null){
            $scope.$location.path("/home");
        }
        else{
            $scope.puser={firstName:$rootScope.user.firstName,
                lastName:$rootScope.user.lastName,
                username:$rootScope.user.username,
                password:$rootScope.user.password,
                email:$rootScope.user.email};
        }
        //declare event handlers
        $scope.update=update;
        function update(user){
            UserService.updateUser($rootScope.user._id,user)
                .then(function(res){
                    console.log(res);
                    if(res.data){
                        $rootScope.user = res.data;
                        console.log("user after updation:");
                        console.log($rootScope.user);
                        $scope.SuccessAlert=true;
                        $timeout(function(){
                            $scope.SuccessAlert=false;
                        },2000);
                    }
                });
        }
    }
})();

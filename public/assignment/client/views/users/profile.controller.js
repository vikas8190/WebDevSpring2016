/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);
    function ProfileController($scope,$rootScope,$timeout,UserService){
        var vm=this;

        function init(){
            if($rootScope.currentUser==null){
                $scope.$location.path("/home");
            }
            else {
                console.log("rootscope user:");
                console.log($rootScope.currentUser);
                vm.puser =
                {
                    firstName: $rootScope.currentUser.firstName,
                    lastName: $rootScope.currentUser.lastName,
                    username: $rootScope.currentUser.username,
                    password: $rootScope.currentUser.password,
                    email: $rootScope.currentUser.email
                };
            }
        }
        init();
        //declare event handlers
        vm.update=update;

        function update(user){
            console.log("update called");
            console.log($rootScope.currentUser);
            UserService.updateUser($rootScope.currentUser._id,user)
                .then(function(response){
                    console.log(response);
                    if(response.data){
                        UserService.findUserByID($rootScope.currentUser._id)
                            .then (function (res) {
                                console.log("response of updated user");
                                console.log(res);
                                vm.puser.username = res.data.username;
                                vm.puser.firstName = res.data.firstName;
                                vm.puser.lastName = res.data.lastName;
                                vm.puser.email = res.data.email;
                                UserService.setCurrentUser(res.data);
                                $scope.SuccessAlert = true;
                                $timeout(function () {
                                    $scope.SuccessAlert = false;
                                }, 2000);
                            })
                    }
                });
        }
    }
})();

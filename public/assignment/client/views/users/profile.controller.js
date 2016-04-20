/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);
    function ProfileController($scope,$location,$rootScope,$timeout,UserService){
        var vm=this;
        vm.curUser=$rootScope.currentUser;
        vm.setPasswordModified=setPasswordModified;
        console.log($rootScope.currentUser);
        /*function init(){
            vm.puser={};
            UserService.findUserByID($rootScope.currentUser._id)
                .then(function(response){
                    vm.puser=response.data;
                    vm.puser.emails=vm.puser.emails.join(",");
                    vm.puser.phones=vm.puser.phones.join(",");
                });
        }

        init();*/

        //declare event handlers
        vm.update=update;

        function update(user){
            console.log("update user:");
            console.log(user);
            //user.emails=user.emails.split(",");
            //user.phones=user.phones.split(",");
            console.log("updating user");
            console.log(user);
            UserService.updateUser(vm.curUser._id,user)
                .then(function(response){
                    if(response.data){
                        console.log("after update:");
                        console.log(response.data);
                        vm.users = response.data;
                        /*UserService.findUserByID($rootScope.currentUser._id)
                            .then (function (res) {
                                vm.puser.username = res.data.username;
                                vm.puser.firstName = res.data.firstName;
                                vm.puser.lastName = res.data.lastName;
                                vm.puser.emails = res.data.emails.join(",");
                                vm.puser.phones = res.data.phones.join(",");
                                UserService.setCurrentUser(res.data);
                                vm.SuccessAlert = true;
                                $timeout(function () {
                                    vm.SuccessAlert = false;
                                }, 2000);
                            })*/
                    }},
                    function(err) {
                        $scope.error = err;
                    });
        }
        function setPasswordModified(){
            vm.curUser.password_modified=true;
        }
    }
})();

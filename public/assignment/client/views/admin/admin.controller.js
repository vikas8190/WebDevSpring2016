/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);
    function AdminController($rootScope,$location,UserService){
        var vm=this;
        vm.users=null;
        function init(){
            vm.newUser=null;
            UserService.findAllUsers()
                .then(function(response){
                    vm.users=response.data;
                });
            if($rootScope.currentUser==null)
            {
                $location.path("/home");
            }
            vm.deleteUser=deleteUser;
            vm.createUser=createUser;
            vm.selectUser=selectUser;
            vm.updateUser=updateUser;
        }
        init();

        function deleteUser(userID){
            console.log("delete user id");
            console.log(userID);
            if(userID!=$rootScope.currentUser._id) {
                UserService.deleteUserById(userID)
                    .then(function (response) {
                        console.log("after delete");
                        vm.users = response.data;
                    });
            }
        }

        function createUser(user){
            console.log("have to create");
            console.log(user);
            UserService.createUser(user)
                .then(function(response){
                    vm.users=response.data;
                });
        }

        function selectUser(user){
            vm.selectedUserID=user._id;
            vm.newUser= {username:user.username,
                        password:user.password,
                        lastName:user.lastName,
                        firstName:user.firstName,
                        roles:user.roles};
            //delete vm.newUser._id;
        }

        function updateUser(user){
            console.log("user:");
            console.log(user);
            if(vm.selectedUserID!=null) {
                UserService.updateUser(vm.selectedUserID, user)
                    .then(function (response) {
                        vm.users = response.data;
                    });
            }
        }
    }
})();

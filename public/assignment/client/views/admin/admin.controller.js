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
        vm.password_modified=false;
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
            vm.sortOrder={username:false,firstName:false,lastName:false};
            vm.sortKey="";
            vm.deleteUser=deleteUser;
            vm.createUser=createUser;
            vm.selectUser=selectUser;
            vm.updateUser=updateUser;
            vm.sortUsers=sortUsers;
            vm.setPasswordChange=setPasswordChange;
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
                        sortByKey(vm.sortKey);
                    });
            }
        }

        function createUser(user){
            console.log("have to create");
            console.log(user);
            UserService.createUser(user)
                .then(function(response){
                    vm.users=response.data;
                    sortByKey(vm.sortKey);
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
                        if(response.data){
                            console.log("finding users");
                            console.log(response.data);
                            vm.users = response.data;
                            sortByKey(vm.sortKey);
                            UserService.findAllUsers()
                                .then(function(response){
                                    console.log("response of all users");
                                    vm.users = response.data;
                                    sortByKey(vm.sortKey);
                                });
                            }
                    });
                /*UserService.findAllUsers()
                    .then(function(response){
                        console.log("response of all users");
                        console.log(response);
                        vm.users = response.data;
                        sortByKey(vm.sortKey);
                    });*/
            }
        }

        function sortUsers(type){
            vm.sortKey=type;
            vm.sortOrder[vm.sortKey]=!vm.sortOrder[vm.sortKey];
            var test=sortByKey(vm.sortKey);
            console.log(test);
        }

        function sortByKey(key){
            if(key!=""){
                console.log("sorting");
                var arr=vm.users;
                return arr.sort(function(a,b){
                    //var x=a[key];
                    //var y=b[key];
                    var x=(a[key]===null)?"":""+a[key];
                    var y=(b[key]===null)?"":""+b[key];
                    if(vm.sortOrder[key]) {
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    }
                    else{
                        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                    }
                });
            }
        }

        function setPasswordChange(){
            if(vm.newUser) {
                vm.newUser.password_modified = true;
            }
        }
    }
})();

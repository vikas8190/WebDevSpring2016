/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);
    function UserService($http,$rootScope) {

        var service={
            findUserByCredentials : findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findUserByID:findUserByID,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            logout:logout
        };

        return service;
        function findUserByCredentials(username, password) {
            console.log("calling service get to server");
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }
        function findUserByUsername(username) {
            console.log("calling service get to server");
            return $http.get("/api/assignment/user?username="+username);
        }
        function createUser(user){
            console.log("create user called");
            return $http.post("/api/assignment/user",user);
        }
        function findUserByID(userID){
            return $http.get("/api/assignment/user/"+userID);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }
        function deleteUserById(userId){
            return $http.delete("/api/assignment/user/"+userId);
        }
        function updateUser(userId, user){
            return $http.put("/api/assignment/user/"+userId,user);
        }
        function getCurrentUser() {
            console.log("get the current logged in user:");
            return $http.get("/api/assignment/user/logged_in");
        }

        function setCurrentUser(user) {
            console.log("setting current user as:");
            console.log(user);
            $rootScope.currentUser = user;
        }

        function logout() {
            return $http.post("/api/assignment/user/logout")
        }
    }
})();
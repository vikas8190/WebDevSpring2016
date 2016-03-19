/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);
    function UserService($http) {
        var users=[
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];
        var service={
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };

        return service;
        function findUserByCredentials(username, password) {
            console.log("calling service get to server");
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }
        function createUser(user){
            return $http.post("/api/assignment/user",user);
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
    }
})();
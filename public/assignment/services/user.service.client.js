/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);
    function UserService() {
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
        function findUserByCredentials(username, password, callback) {
            var userindex=-1;
            for(var i=0;i<users.length;i++)
            {
                if(users[i].username==username && users[i].password==password )
                {
                    userindex=i;
                    break;
                }
            }
            if(userindex!=-1)
            {
                callback(users[userindex]);
            }
            else
            {
               callback(null);
            }
        }
        function createUser(user,callback){
            user._id=(new Date).getTime();
            user.roles="[student]";
            users.push(user);
            callback(user);
        }
        function findAllUsers(callback){
            callback(users);
        }
        function deleteUserById(userId, callback){
            for(var i=0;i<users.length;i++){
                if(users[i]._id==userid){
                    users.splice(i,1);
                    break;
                }
            }
            callback(users);
        }
        function updateUser(userId, user, callback){
            for(var i=0;i<users.length;i++){
                if(users[i]._id==userId){
                    users[i].password=user.password;
                    users[i].firstName=user.firstName;
                    users[i].lastName=user.lastName;
                    break;
                }
            }
            callback(users[i]);
        }
    }
})();
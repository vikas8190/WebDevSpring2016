/**
 * Created by vilas on 17-03-2016.
 */
var users=require('./user.mock.json');
module.exports=function(){


    var api={
        createUser:createUser,
        findAllUsers:findAllUsers,
        findUserByID:findUserByID,
        updateUserByID:updateUserByID,
        deleteUserByID:deleteUserByID,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername:findUserByUsername
    };
    return api;


    function findAllUsers() {
        return users;
    }

    function findUserByID(userID) {
        for(var user in users){
            if(users[user]._id=userID){
                return users[user];
            }
        }
    }

    function filterUsers(user,userID){
        return user._id!=userID;
    }

    function deleteUserByID(userID) {
        users=users.filter(filterUsers,userID);
        return users;
    }

    function createUser(user) {
        var last_userID=users[users.length-1]._id;
        var newUser= {
            _id: last_userID + 1,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email,
            roles: user.roles
        };
        users.push(newUser);
        return newUser;
    }

    function updateUserByID(userID,user) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == userID) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].username = user.username;
                users[i].password = user.password;
                users[i].email = user.email;
                users[i].roles = user.roles;
                return users[i];
            }
        }
    }

    function findUserByUsername(username) {
        for(var user in users){
            if(users[user].username=username){
                return users[user];
            }
        }
    }
    function findUserByCredentials(credentials) {
        var matchuser = null;
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == credentials.username && users[i].password == credentials.password) {
                matchuser = users[i];
                break;
            }
        }
        return matchuser;
    }
}

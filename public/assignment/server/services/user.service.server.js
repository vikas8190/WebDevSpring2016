/**
 * Created by vilas on 18-03-2016.
 */
module.exports=function(app,userModel){
    app.post('/api/assignment/user',createUser);
    //app.get('/api/assignment/user?username=:username&password=:password',getUserByCredentials);
    //app.get('/api/assignment/user?username=:username',getUserByUsername);
    app.get('/api/assignment/user',getAllUsers);
    app.get('/api/assignment/user/:id',getUserByID);
    app.put('/api/assignment/user/:id',updateUserByID);
    app.delete('/api/assignment/user/:id',deleteUserByID);
    function createUser(req,res) {
        var user=req.body;
        var users=null;
        var users=userModel.createUser(user);
        res.json(users);
    }
    function getAllUsers(req,res) {
        var users=null;
        if(req.query.username&&req.query.password){
            var credentials={
                username:req.query.username,
                password:req.query.password
            };
            users=userModel.findUserByCredentials(credentials);
        }
        else if(req.query.username){
            var username=req.query.username;
            users=userModel.findUserByUsername(username);
        }
        else{
            users=userModel.findAllUsers();
        }
        res.json(users);
    }
    function getUserByID(req,res) {
        var userID=req.params.id;
        var user=userModel.findUserByID(userID);
        res.json(user);
    }
    function updateUserByID(req,res) {
        var userID=req.params.id;
        var user=req.body;
        var updatedUser=userModel.updateUserByID(userID,user);
        res.json(updatedUser);
    }
    function deleteUserByID(req,res) {
        var userID=req.params.id;
        var users=userModel.deleteUser(userID);
        res.json(users);
    }
    function getUserByCredentials(req,res) {
        var credentials={
            username:req.query.username,
            password:req.query.password
        };
        var user=userModel.findUserByCredentials(credentials);
        res.json(user);
    }
    function getUserByUsername(req,res) {
        var username=req.query.username;
        var user=userModel.findUserByUsername(username);
        res.json(user);
    }
}
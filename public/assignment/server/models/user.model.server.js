/**
 * Created by vilas on 17-03-2016.
 */
module.exports=function(app){
    console.log("in included module");
    var users=require('./user.mock.json');
    app.get('/api/user',function(req,res) {
            res.json(users);
        });
    app.get('/api/user/:id',function(req,res) {
        var index=req.params.id;
        res.json(users[index]);
        });
    app.delete('/api/user/:id',function(req,res) {
            var index=req.params.id;
            courses.splice(index,1);
            res.json(users[index]);
        });
    app.post('/api/user',function(req,res) {
            var newuser=req.body;
            users.push(newuser);
            res.json(users);
        }
    );
    app.put('/api/user/:id',function(req,res) {
            var index=req.params.id;
            users[index]=req.body;
            res.json(users);
        });
    app.get('/api/userbyname/:username',function(req,res) {
        var uname=req.params.username;
        var matchuser=null;
        for(var i=0;i<users.length;i++)
        {
            if(users[i].username==uname)
            {
                matchuser=users[i];
                break;
            }
        }
        res.json(matchuser);
    });
    app.get('/api/userbycred/:cred',function(req,res) {
        var credentials=req.params.cred;
        var matchuser=null;
        for(var i=0;i<users.length;i++)
        {
            if(users[i].username==credentials.username && users[i].password==credentials.password)
            {
                matchuser=users[i];
                break;
            }
        }
        res.json(matchuser);
    });
}

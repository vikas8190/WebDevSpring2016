/**
 * Created by vilas on 18-03-2016.
 */
/**
 * Created by vilas on 17-03-2016.
 */
module.exports=function(app){
    console.log("in included module");
    var forms=require('./form.mock.json');
    app.get('/api/assignment/form',function(req,res) {
        res.json(forms);
    });
    app.get('/api/assignment/form/:id',function(req,res) {
        var index=req.params.id;
        res.json(forms[index]);
    });
    app.delete('/api/assignment/form/:id',function(req,res) {
        var index=req.params.id;
        forms.splice(index,1);
        res.json(forms[index]);
    });
    app.post('/api/assignment/form',function(req,res) {
            var newform=req.body;
            forms.push(newform);
            res.json(forms);
        }
    );
    app.put('/api/assignment/form/:id',function(req,res) {
        var index=req.params.id;
        forms[index]=req.body;
        res.json(forms);
    });
    app.get('/api/assignment/formbytitle/:title',function(req,res) {
        var title=req.params.title;
        var matchform=null;
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].title==title)
            {
                matchform=forms[i];
                break;
            }
        }
        res.json(matchform);
    });
}

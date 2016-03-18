/**
 * Created by vilas on 18-03-2016.
 */
/**
 * Created by vilas on 17-03-2016.
 */
module.exports=function(app){
    var forms=require('./form.mock.json');
    var uuid=require(node-uuid);
    var api={
        createFormForUser:createFormForUser,
        findAllFormForUser:findAllFormForUser,
        findFormByID:findFormByID,
        updateFormByID:updateFormByID,
        deleteFormByID:deleteFormByID,
        findFormByTitle:findFormByTitle
    };
    return api;


    function createFormForUser(userID,form) {
        var last_userID=users[users.length-1]._id;
        var newForm= {
            _id: uuid.v4(),
            title:form.title,
            userId:userId,
            fields:form.fields
        };
        users.push(newForm);
        return newForm;
    }
    function findAllFormForUser(userID) {
        var userForms=null;
        for(var i=0;i<forms.length;i++){
            if(forms[i].userId==userID) {
                userForms.push(forms[i]);
            }
        }
        return userForms;
    }

    function findFormByID(formID) {
        for(var form in forms){
            if(forms[form]._id=formID){
                return forms[form];
            }
        }
    }

    function filterForms(form,formID){
        return form._id!=formID;
    }

    function deleteFormByID(formID) {
        forms=forms.filter(filterForms,formID);
        return forms;
    }


    function updateFormByID(formID,form) {
        for (var i = 0; i < form.length; i++) {
            if (forms[i]._id == formID) {
                forms[i] = form;
                return forms[i];
            }
        }
    }

    function findFormByTitle(title) {
        for (var i = 0; i < form.length; i++) {
            if (forms[i].title == title) {
                return forms[i];
            }
        }
    }

    function findAllFormFieldsForFormID(formID){
        for(var form in forms){
            if(forms[form]._id==formID){
                return forms[form].fields;
            }
        }
        return null;
    }

    function findFormFieldByID(formID,fieldID){
        for(var form in forms){
            if(forms[form]._id==formID){
                for(var f in forms[form].fields){
                    if(forms[form].fields[f]._id==fieldID){
                        return forms[form].fields[f];
                    }
                }
                break;
            }
        }
        return null;
    }

    function deleteFormFieldByID(formID,fieldID){
        for(var form in forms){
            if(forms[form]._id==formID){
                for(var f in forms[form].fields){
                    if(forms[form].fields[f]._id==fieldID){
                        forms[form].fields[f].splice(f,1);
                        return forms[form];
                    }
                }
                break;
            }
        }
        return null;
    }
    function createFormField(formID,field){
        var newField={
            _id:uuid.v4(),
            label:field.label,
            type:field.type,
            placeholder:field.placeholder
        };
        for(var form in forms){
            if(forms[form]._id==formID){
                forms[form].fields.push(newField);
                return forms[form];
            }
        }
        return null;
    }

    function updateFormFieldByID(formID,fieldID,field){
        for(var form in forms){
            if(forms[form]._id==formID){
                for(var f in forms[form].fields){
                    if(forms[form].fields[f]._id==fieldID){
                        forms[form].fields[f].label=field.label;
                        forms[form].fields[f].type=field.type;
                        forms[form].fields[f].placeholder=field.placeholder;
                        return forms[form];
                    }
                }
                break;
            }
        }
        return null;
    }
}

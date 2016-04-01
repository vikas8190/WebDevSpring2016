/**
 * Created by vilas on 17-03-2016.
 */

module.exports=function(formModel){

    var Form = formModel.getMongooseModel();

    var api={
        findFormFieldByID:findFormFieldByID,
        deleteFormFieldByID: deleteFormFieldByID,
        createFormField: createFormField,
        updateFormFieldByID: updateFormFieldByID
    };
    return api;

    function findFormFieldByID(formID,fieldID){
        return Form.findById(formID)
            .then(function(form){
                return form.fields.id(fieldID);
            });
    }

    function deleteFormFieldByID(formID,fieldID){
        return Form.findById(formID)
            .then(function(form){
                form.fields.id(fieldID).remove();
                return form.save();
            })
    }
    function createFormField(formID,field){
        var newField={
            label:field.label,
            type:field.type,
            placeholder:field.placeholder,
            options:field.options
        };
        return Form.findById(formID)
            .then(function(form){
                form.fields.push(newField);
                return form.save();
            });
    }

    function updateFormFieldByID(formID,fieldID,field){
        return Form.findById(formID)
            .then(function(form){
                var f=form.fields.id(fieldID);
                f.label=field.label;
                f.type=field.type;
                f.placeholder=field.placeholder;
                f.options=field.options;
                return form.save();
            });
    }
}


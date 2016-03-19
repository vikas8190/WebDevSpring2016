/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);
    function FieldController($rootScope,$routeParams,UserService,FieldService,$scope,$location){
        var vm = this;
        var formID = $routeParams.formID;

        function init() {
            if ($rootScope.user==null) {
                $location.path("#/home");
            }
            console.log("init formid here:");
            console.log(formID);
            vm.recordFieldEdit=recordFieldEdit;
            vm.addField=addField;
            vm.resetEditRecording=resetEditRecording;
            vm.deleteField=deleteField;
            if(formID) {
                FieldService
                    .getFieldsForForm(formID)
                    .then(function(res){
                        console.log(res);
                        vm.fields = res.data;
                    });
            }
        }
        init();

        function recordFieldEdit(field) {
            console.log("record field edit called");
            resetEditRecording();
            vm.curField = field;
            vm.curFieldLabel=field.label;
            if(field.options){
                var opt="";
                for(var i in field.options){
                    opt += (field.options[i].label + ":" + field.options[i].value +"\n");
                }
                vm.curFieldOptions=opt;
            }
            else{
                vm.curFieldPlaceHolder=field.placeholder;
            }
        }

        function resetEditRecording(){
            vm.curField = null;
            vm.curFieldLabel = null;
            vm.currFieldPlaceholder = null;
            vm.currFieldOptions = null;
        }

        function addField(fieldType) {
            console.log("called add field");
            var newField = {}
            if (fieldType == "TEXT") {
                newField._id = null;
                newField.label = "New Text Field";
                newField.type = "TEXT";
                newField.placeholder = "New Field";
            } else if (fieldType == "TEXTAREA") {
                newField._id = null;
                newField.label = "New Text Field";
                newField.type = "TEXTAREA";
                newField.placeholder = "New Field";
            } else if (fieldType == "DATE") {
                newField._id = null;
                newField.label = "New Date Field";
                newField.type = "DATE";
            } else if (fieldType == "OPTIONS") {
                newField._id = null;
                newField.label = "New Dropdown";
                newField.type = "OPTIONS";
                newField.options = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];
            } else if (fieldType == "CHECKBOXES") {
                newField._id = null;
                newField.label = "New Checkboxes";
                newField.type = "CHECKBOXES";
                newField.options = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
            } else if (fieldType == "RADIOS") {
                newField._id = null;
                newField.label = "New Radio Buttons";
                newField.type = "RADIOS";
                newField.options = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
            } else {
                // do nothing
            }

            FieldService
                .createFieldForForm(formID, newField)
                .then(function(res){
                    console.log(res.data);
                    vm.fields = res.data.fields;
                });
        }

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(formID, field._id)
                .then(function (res) {
                    console.log(res.data);
                    vm.fields = res.data.fields;
                });
        }

        $scope.$location=$location;
    }
})();

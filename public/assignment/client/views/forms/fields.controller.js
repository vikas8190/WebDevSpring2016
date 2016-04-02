/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);
    function FieldController($rootScope,$routeParams,UserService,FormService,FieldService,$scope,$location,$uibModal){
        var vm = this;
        var formID = $routeParams.formID;
        function init() {

            vm.recordFieldEdit=recordFieldEdit;
            vm.addField=addField;
            vm.resetEditRecording=resetEditRecording;
            vm.deleteField=deleteField;
            vm.editField=editField;
            if(formID) {
                vm.formID=formID;
                FieldService
                    .getFieldsForForm(formID)
                    .then(function(res){
                        vm.fields = res.data;
                    });

            }
            $scope.sortableFields = {
                disabled: false,
                update: function(event) {
                    FormService.getFormByID($scope.model.formID)
                        .then(function(res){
                            if(res.data){
                                var curForm=res.data;
                                curForm.fields=vm.fields;
                                FormService.updateFormById($scope.model.formID,curForm);
                            }
                        });
                    return true;
                }
            };
        }
        init();

        function recordFieldEdit(field) {
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
                    vm.fields = res.data.fields;
                });
        }

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(formID, field._id)
                .then(function (res) {
                    vm.fields = res.data.fields;
                });
        }

        //$scope.$location=$location;

    function editField($index) {
        vm.curEditField = vm.fields[$index];
        var modalInstance = $uibModal.open( {
            templateUrl: 'EditFieldModal.html',
            controller: 'ModalController',
            resolve: {
                field: function () {
                    return vm.curEditField;
                }
            }
        });
        modalInstance.result
            .then(function (field) {
                FieldService.updateField(formID, field._id, field)
                    .then(function(response){
                        FieldService.getFieldsForForm(formID)
                            .then(function(response){
                                vm.fields = response.data;
                            })
                    });
            });
    }
}

angular.module('FormBuilderApp').controller('ModalController', function ($scope, $uibModalInstance, field) {

    $scope.field = field;
    $scope.ok = function () {
        if($scope.newLabel) {
            $scope.field.label = $scope.newLabel;
        }
        if($scope.field.type != "DATE") {
            if($scope.newPlaceholder) {
                if($scope.field.type === "TEXT" || $scope.field.type === "TEXTAREA") {
                    $scope.field.placeholder = $scope.newPlaceholder;
                } else {
                    UpdateOptions();
                }
            }
        }

        function UpdateOptions() {
            var content = $scope.newPlaceholder;
            content = content.trim();
            var rawOptions = content.split("\n");
            var options = [];
            for (var i in rawOptions) {
                var rawField = rawOptions[i].split(":");
                var option = {label: rawField[0], value: rawField[1]};
                options.push(option);
            }
            $scope.field.options = options;
        }
        $uibModalInstance.close($scope.field);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
})();

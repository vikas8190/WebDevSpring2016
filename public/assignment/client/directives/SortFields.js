/**
 * Created by vilas on 19-03-2016.
 */
(function () {
    angular
        .module("sortFields", [])
        .directive("sortFields", sortFields);
    function sortFields(FieldService,FormService) {
        var start = null;
        var end=null;
        function link(scope, element, attributes) {
            var fieldAxis = attributes.fieldAxis;
            $(element).sortable( {
                axis: fieldAxis,
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    end = ui.item.index();
                    console.log("in stop");
                    console.log("start:");
                    console.log(start);
                    console.log("end");
                    console.log(end);
                    console.log("model before switch");
                    //console.log(scope.model.fields);
                    //var temp = scope.model.fields[start];
                    //scope.model.fields[start] = scope.model.fields[end];
                    //scope.model.fields[end] = temp;
                    var newFields=scope.model.fields;
                    var temp=newFields[start];
                    newFields[start]=newFields[end];
                    newFields[end]=temp;
                    console.log(newFields);
                    //console.log("after switch model");
                    //console.log(scope.model);
                    /*FormService.getFormByID(scope.model.formID)
                        .then(function(res){
                            if(res.data){
                                var curForm=res.data;
                                curForm.fields=scope.model.fields;
                                console.log("updated form:");
                                console.log(curForm);
                                FormService.updateFormById(scope.model.formID,curForm);
                                console.log(res);
                            }
                        });*/
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})();
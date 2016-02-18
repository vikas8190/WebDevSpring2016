/**
 * Created by vilas on 18-02-2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(Config);

    function Config($routeProvider)
    {
        $routeProvider
            .when("/home",{
                templateUrl:"/assignment/view/home/home.view.html",
                controller: "HomeController as controller"
            });
    }
})();
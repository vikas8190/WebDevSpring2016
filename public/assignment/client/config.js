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
                templateUrl:"/assignment/client/views/home/home.view.html",
                controller: "HomeController as controller"
            })
            .when("/register",{
                templateUrl:"/assignment/client/views/users/register.view.html",
                controller: "RegisterController as controller"
            })
            .when("/login",{
                templateUrl:"/assignment/client/views/users/login.view.html",
                controller: "LoginController as controller"
            })
            .when("/profile",{
                templateUrl:"/assignment/client/views/users/profile.view.html",
                controller: "ProfileController as controller"
            })
            .when("/admin",{
                templateUrl:"/assignment/client/views/admin/admin.view.html",
                controller: "AdminController as controller"
            })
            .when("/forms",{
                templateUrl:"/assignment/client/views/forms/forms.view.html",
                controller: "FormController as controller"
            })
            .when("/form/:formID/fields",{
                templateUrl:"/assignment/client/views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model"
            });
    }
})();
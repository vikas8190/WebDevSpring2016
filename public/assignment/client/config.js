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
                templateUrl:"/assignment/views/home/home.view.html",
                controller: "HomeController as controller"
            })
            .when("/register",{
                templateUrl:"/assignment/views/users/register.view.html",
                controller: "RegisterController as controller"
            })
            .when("/login",{
                templateUrl:"/assignment/views/users/login.view.html",
                controller: "LoginController as controller"
            })
            .when("/profile",{
                templateUrl:"/assignment/views/users/profile.view.html",
                controller: "ProfileController as controller"
            })
            .when("/admin",{
                templateUrl:"/assignment/views/admin/admin.view.html",
                controller: "AdminController as controller"
            })
            .when("/forms",{
                templateUrl:"/assignment/views/forms/forms.view.html",
                controller: "FormController as controller"
            })
            .when("/fields",{
                templateUrl:"/assignment/views/forms/fields.view.html",
                controller: "FieldController as controller"
            });
    }
})();
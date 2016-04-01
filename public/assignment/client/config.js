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
                controller: "HomeController as controller",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl:"/assignment/client/views/users/register.view.html",
                controller: "RegisterController as controller",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl:"/assignment/client/views/users/login.view.html",
                controller: "LoginController as controller",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl:"/assignment/client/views/users/profile.view.html",
                controller: "ProfileController as controller",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin",{
                templateUrl:"/assignment/client/views/admin/admin.view.html",
                controller: "AdminController as controller",
                controllerAs: "model"
            })
            .when("/forms",{
                templateUrl:"/assignment/client/views/forms/forms.view.html",
                controller: "FormController as controller",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formID/fields",{
                templateUrl:"/assignment/client/views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }


            });
    }

    function checkLoggedIn(UserService, $q, $location) {
        console.log("check if logged in");
        var deferred = $q.defer();
        UserService.getCurrentUser().then(function (response) {
            var currentUser = response.data;
            if (currentUser) {
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url("/home");
            }
        });
        return deferred.promise;
    }

})();
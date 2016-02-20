/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$rootScope,UserService){
        $scope.register=register;

        function register(user){
            console.log("register called");
            UserService.createUser(user,redirect);
        }
        function redirect(user){
            console.log("user in redirect"+user);
            $rootScope.user=user;
            $scope.$location.path("/profile");
        }
    }
})();

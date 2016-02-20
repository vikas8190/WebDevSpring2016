/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);
    function LoginController($scope,$rootScope,UserService){
        $scope.login=login;

        //event handler implementations:
        function login(user) {
            UserService.findUserByUsernameAndPassword(user.username,user.password,login_user);
            function login_user(user)
            {
                $rootScope.user=user;
                $scope.$location.path("/profile");
            }

        }
    }
})();
/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);
    function LoginController($scope,$rootScope,UserService){
        console.log($scope.LoginData);
        $scope.login=login;

        //event handler implementations:
        function login(user) {
            console.log($scope.user);
            UserService.findUserByUsernameAndPassword(user.username,user.password,login_user);
            function login_user()
            {
                console.log("inside login user");
                $rootScope.user=user;
                $scope.$location.path("/profile");
            }

        }
    }
})();
/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);
    function ProfileController($scope,$rootScope,UserService){
        if($scope.user==null){
            $scope.$location.path("/home");
        }
        else{
            console.log($rootScope.user);
            $scope.user.firstName=$rootScope.user.firstName;
            $scope.user.lastName=$rootScope.user.lastName;
        }
        //declare event handlers
        $scope.update=update;
        function update(user){
            console.log($rootScope.user);
            UserService.updateUser($rootScope.user._id,user,update_user);
        }
        function update_user(user){
            $rootScope.user=user;
            console.log($rootScope.user);
        }
    }
})();

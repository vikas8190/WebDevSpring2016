/**
 * Created by vilas on 17-02-2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);
    function ProfileController($scope,$rootScope,UserService){
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

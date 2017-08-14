angular.module('LoginCtrl', []).controller('LoginCtrl', ['$scope', '$http', '$location', '$cookies', 'AuthService', function($scope, $http, $location, $cookies, AuthService) {
    $scope.formData = {
        username: "",
        password: ""
    };

    $scope.showError = false;
    $scope.errorMessage = '';

    $scope.clearForm = function () {
        for (var d in $scope.formData) {
            if ($scope.formData.hasOwnProperty(d))
                $scope.formData[d] = "";
        }
    };

    $scope.submitForm = function () {
        AuthService.login($scope.formData).then(function (response) {
            $location.path('/night-crews');
        }, function (error) {
            console.log(error);
            if (error.data.fail_type == "locked") {
              sweetAlert("Account Disabled", error.data.errors.locked, "error");
            }
            else{
            sweetAlert("Houston, we have a problem!", error.data.errors.credentials, "error");
            $scope.errorMessage= error.data.errors.credentials;
            $scope.showError = true;
          }
        })
    };
}]);

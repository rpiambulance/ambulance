angular.module('CPRCertificationCtrl', []).controller('CPRCertificationCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.formData = {
        name: "",
        email: ""
    };

    sweetAlert("Heads up!", "Due to some changes with our hosting service, our email forms are currently not working. We are trying our best to resolve the issue. For now, please contact us directly at cpr@rpiambulance.com.", 'error');


    var autocompleteValidate = function () {
        var corrected = {};
        for (var d in $scope.formData) {
            if($scope.formData.hasOwnProperty(d)) {
                if(document.getElementById(d).value !== $scope.formData[d] && d != "g-recaptcha-response") {
                    corrected[d] = document.getElementById(d).value;
                } else {
                    corrected[d] = $scope.formData[d];
                }
            }
        }
        return corrected;
    };

    $scope.clearForm = function () {
        for (var d in $scope.formData) {
            if ($scope.formData.hasOwnProperty(d))
                $scope.formData[d] = "";
        }
    };

    $scope.availability = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    };

    $scope.interests = {
        "BLS CPR for Healthcare Providers": false,
        "Heartsaver AED & CPR": false,
        "Heartsaver First Aid": false
    };

    var createAvailabilityString = function (availability) {
        var string = "";

        for(var day in availability) {
            if(availability[day]) {
                string += day.charAt(0).toUpperCase() + day.slice(1) + ", ";
            }
        }

        // substring to remove the last ", "
        return string.substring(0, string.length - 2);
    };

    var createInterestsString = function (interests) {
        var string = "";

        for(var i in interests) {
            if(interests[i]) {
                string += i + ", ";
            }
        }

        // substring to remove the last ", "
        return string.substring(0, string.length - 2);
    };

    $scope.submitForm = function () {
        if(!document.getElementById("g-recaptcha-response")) {
            return;
        }

        $scope.formData["g-recaptcha-response"] = document.getElementById("g-recaptcha-response").value;
        $scope.formData = autocompleteValidate();
        $scope.formData.availability = createAvailabilityString($scope.availability);
        $scope.formData.interests = createInterestsString($scope.interests);

        $http({
            method: 'POST',
            url: '.cpr_submit.php',
            data: $scope.formData, // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'} // set the headers so angular passing info as form data (not request payload)
        }).success(function (data) {
            if (!data.success) {
                console.log("it failed!");
                // if not successful, bind errors to error variables
                if(data.errors.name) {
                    $scope.errorName = data.errors.name;
                }
                if(data.messageError) {
                    $scope.submissionMessage = data.messageError;
                }
                $scope.submission = true; //shows the error message
            } else {
                $scope.showContactSuccess = true;
                // if successful, bind success message to message
                $scope.submissionMessage = data.messageSuccess;
                $scope.formData = {}; // form fields are emptied with this line
                $scope.submission = true; //shows the success message
            }
        });
    };

}]);
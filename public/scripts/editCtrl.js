"use strict";
app.controller("editCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.product = {};
    $scope.save = function() {
        if ($scope.productform.$valid) {
            $scope.productform.$setUntouched();
            $('.submit-btn').button('loading');
            $http.post("/product", $scope.product).success(function(product) {
                $scope.product = {};
                $scope.productform.$setPristine();
                toastr.success('Successfully added product ' + product.productName);
                $('.submit-btn').button('reset');
            }).error(function(data, statusCode) {
                if (statusCode == 403) {
                    toastr.error(data);
                } else {
                    toastr.error("Unexpected error occurred, please inform administrator milinaudara@gmail.com.");
                }
            });
        }
    };
}]);

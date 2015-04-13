app.controller("editCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.product = {};
    $scope.save = function() {
        $http.post("/product/add", $scope.product).success(function(product) {
            $scope.product = {};
            toastr.success('Successfully added product ' + product.productName);
        }).error(function(data, statusCode) {
            if (statusCode == 403) {
                toastr.error(data);
            } else {
                toastr.error("Unexpected error occurred, please inform administrator milinaudara@gmail.com.");
            }
        });
    }
}]);

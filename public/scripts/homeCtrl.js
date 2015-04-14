app.controller("homeCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.hasProduct = false;
    $scope.searchProduct = function(val) {
        return $http.get('/product/' + val).then(function(response) {
            $scope.selectedProduct = null;
            var productList = response.data;
            $scope.hasProduct = productList.length;
            return productList;
        });
    };

    $scope.onSelect = function($item) {
        $scope.asyncSelected = "";
        $scope.selectedProduct = $item;
        $scope.hasProduct = true;
    };

    $scope.editProduct = function($item) {
        if ($scope.productform.$valid) {
            $http.put("/product", $scope.selectedProduct).success(function(product) {
                toastr.success('Successfully edited product ' + product.productName);
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

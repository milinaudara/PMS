app.controller("homeCtrl", ["$scope", "$http", function($scope, $http) {

    $scope.searchProduct = function(val) {
        return $http.get('/productSearch/' + val).then(function(response) {
            return response.data;
        });
    };

    $scope.onSelect = function($item) {
    	$scope.asyncSelected="";
        $scope.selectedProduct = $item;
    };

    $scope.editProduct = function($item) {
    	$http.put("/product/edit", $scope.selectedProduct).success(function(product) {
            toastr.success('Successfully edited product ' + product.productName);
        }).error(function(data, statusCode) {
            if (statusCode == 403) {
                toastr.error(data);
            } else {
                toastr.error("Unexpected error occurred, please inform administrator milinaudara@gmail.com.");
            }
        });
    };
}]);

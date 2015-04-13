app.controller("homeCtrl", ["$scope","$http", function($scope,$http) {

    $scope.searchProduct = function(val) {
        return $http.get('/productSearch/' + val).then(function(response) {
            return response.data;
        });
    };
}]);

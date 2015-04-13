app.controller("editCtrl", ["$scope","$http", function ($scope,$http) {
$scope.product={productName:"sss"};
   $scope.save=function(){
   	 $http.post("/product/add",$scope.product).success(function() {
            $window.location.href = "/";

        }).error(function(data, statusCode) {
            if(statusCode==403){
                toastr.error(data);
            }else{
                toastr.error("Unexpected error occurred, please inform administrator milinaudara@gmail.com.");
            }
        });
   }
}]);

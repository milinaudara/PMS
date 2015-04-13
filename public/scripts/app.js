var app = angular.module("pms",["ngRoute","angular-loading-bar"]);

app.config(["$routeProvider",function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "home.html",
        controller: "homeCtrl"
    }).when("/edit", {
        templateUrl: "edit.html",
        controller: "editCtrl"
    });
}]);
var app = angular.module("pms", ["ngRoute", "angular-loading-bar", "ui.bootstrap", "ng-currency"]);


app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "home.html",
        controller: "homeCtrl"
    }).when("/edit", {
        templateUrl: "edit.html",
        controller: "editCtrl"
    });
}]);

app.directive('numbersOnly', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});

app.directive("notLessThan", function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, ele, attrs, ctrl) {
            ctrl.$parsers.unshift(function(value) {
                if (value) {
                    attrs.$observe("originalValue", function(originalValue) {
                        var valid = parseInt(originalValue) >= parseInt(attrs.comparingValue)
                        ctrl.$setValidity('notLessThan', valid);
                    });


                }
                return value;
            });

        }
    }
});

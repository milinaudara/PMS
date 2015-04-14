"use strict";

describe("homeCtrl", function() {
    var scope;
    var httpBackend;
    var controller;

    var respondProducts = [{
        productName: 'Product1',
        costPrice: 1,
        sellingPrice: 20,
        quantity: 23
    }, {
        productName: 'Product2',
        costPrice: 2,
        sellingPrice: 30,
        quantity: 23
    }, {
        productName: 'Product3',
        costPrice: 3,
        sellingPrice: 40,
        quantity: 23
    }, {
        productName: 'Product4',
        costPrice: 4,
        sellingPrice: 10,
        quantity: 23
    }, {
        productName: 'Product5',
        costPrice: 5,
        sellingPrice: 50,
        quantity: 23
    }];

    beforeEach(module("pms"));
    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        controller = $controller("homeCtrl", {
            $scope: scope
        });
      
    }));

    it("should get product for autocomlete", function() {
        httpBackend.expectGET("/product/t").respond(respondProducts);
        var productList=scope.searchProduct('t');
        httpBackend.flush();       
        expect(scope.hasProduct).to.eql(5);
        expect(productList.$$state.value).to.eql(respondProducts);
    });    
});

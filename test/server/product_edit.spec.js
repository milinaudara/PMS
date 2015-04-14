"use strict";
var expect = require("expect");
var Sequelize = require("sequelize");
var sequelize = new Sequelize("mysql://udara:123456@localhost:3306/pms_test_db", {
    logging: false
});
var model = require("../../server/model")(sequelize);
var productService = require("./../../server/productService")(sequelize);
var stub = require("./stub");

describe("Product edit ", function() {
    var req;
    var savedProduct = {
        productName: 'Product1',
        costPrice: 12.5,
        sellingPrice: 30.9,
        quantity: 23
    };
    var productRequest = {
        productName: 'editedName',
        costPrice: 4,
        sellingPrice: 20,
        quantity: 3
    };
    beforeEach(function(done) {
        sequelize.sync({
            force: true
        }).success(function() {
            model.Product.create(savedProduct).then(function(product) {
                savedProduct.id = product.id;
                productRequest.productId = product.id;
                stub.reqStub(function(r) {
                    req = r;
                    req.body = productRequest;
                    done();
                });
            });
        });
    });
    var mockResponse = function(statusCallback, jsonCallback) {
        return {
            json: jsonCallback,
            status: statusCallback,
            send: statusCallback
        };
    };

    it("should only editable productname and sellingPrice", function(done) {

        productService.edit(req, mockResponse(function(statusCode) {
            expect(statusCode).toEqual(200);
            return this;
        }, function(data) {
            expect(data.productName).toEqual(productRequest.productName);
            expect(data.sellingPrice).toEqual(productRequest.sellingPrice);
            expect(data.costPrice).toEqual(savedProduct.costPrice);
            expect(data.quantity).toEqual(savedProduct.quantity);
            done();
        }));
    });

    it("should validate productName alphanumaric", function(done) {

        req.body.productName= 'edited$Name';
        productService.create(req, mockResponse(function(statusMassage, statusCode) {
            expect(statusMassage).toContain("productName");
            expect(statusCode).toEqual(400);
            done();
        }));
    });

    it("should validate selling price is cannot be less than cost price", function(done) {
        req.body.sellingPrice= 5;
        productService.create(req, mockResponse(function(statusMassage, statusCode) {
            expect(statusMassage).toContain("sellingPrice");
            expect(statusCode).toEqual(400);
            done();
        }));
    });

    it("should validate selling price and cost price numaric", function(done) {
        req.body.sellingPrice= "Not numaric";
        productService.create(req, mockResponse(function(statusMassage, statusCode) {
            expect(statusMassage).toContain("sellingPrice");           
            expect(statusCode).toEqual(400);
            done();
        }));
    });
});

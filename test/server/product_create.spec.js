"use strict";
var expect = require("expect");
var Sequelize = require("sequelize");
var expressValidator = require('express-validator')();
var _ = require("underscore");
var sequelize = new Sequelize("mysql://udara:123456@localhost:3306/pms_test_db", {
    logging: false
});
var model = require("../../server/model")(sequelize);
var productService = require("./../../server/productService")(sequelize);
var stub = require("./stub");

describe("Product create ", function() {
    var req;
    var validProduct = {
        productName: 'Product1',
        costPrice: 12.5,
        sellingPrice: 30.9,
        quantity: 23
    };
    beforeEach(function(done) {
        sequelize.sync({
            force: true
        }).success(function() {
            stub.reqStub(function(r) {
                req = r;
                req.body = validProduct
                done();
            });
        });
    });

    var mockResponse = function(statusCallback, jsonCallback) {
        return {
            json: jsonCallback,
            status: statusCallback,
            send: statusCallback
        }
    };

    it("should save valid product", function(done) {
        productService.create(req, mockResponse(function(statusCode) {
            expect(statusCode).toEqual(200);
            return this;
        }, function(data) {
            expect(data.productName).toEqual(validProduct.productName);
            done();
        }));
    });

    it("should validate productName alphanumaric", function(done) {
        req.body.productName = 'Product_1'
        productService.create(req, mockResponse(function(statusMassage, statusCode) {
            expect(statusMassage).toContain("productName");
            expect(statusCode).toEqual(400);
            done();
        }));
    });

    it("should validate selling price is cannot be less than cost price", function(done) {
        req.body.sellingPrice = 5
        productService.create(req, mockResponse(function(statusMassage, statusCode) {
            expect(statusMassage).toContain("sellingPrice");
            expect(statusCode).toEqual(400);
            done();
        }));
    });

     it("should validate selling price and cost price numaric", function(done) {
        req.body.sellingPrice ='not numaric';
        req.body.costPrice ='not numaric';
        productService.create(req, mockResponse(function(statusMassage, statusCode) {
            expect(statusMassage).toContain("sellingPrice");
             expect(statusMassage).toContain("costPrice");
            expect(statusCode).toEqual(400);
            done();
        }));
    });
});

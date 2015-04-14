"use strict";
var expect = require("expect");
var Sequelize = require("sequelize");
var _ = require("underscore");
var dbConfig = require("./dbConfig")
var sequelize = new Sequelize(dbConfig.conString(), { logging: false});
var model = require("../../server/model")(sequelize);
var productService = require("./../../server/productService")(sequelize);
describe("Product api ", function() {

    beforeEach(function(done) {
        sequelize.sync({
            force: true
        }).success(function() {
            model.Product.bulkCreate([{
                productName: 'Product_1',
                costPrice: 1,
                sellingPrice: 20,
                quantity: 23
            }, {
                productName: 'Product_2',
                costPrice: 2,
                sellingPrice: 30,
                quantity: 23
            }, {
                productName: 'Product_3',
                costPrice: 3,
                sellingPrice: 40,
                quantity: 23
            }, {
                productName: 'Product_4',
                costPrice: 4,
                sellingPrice: 10,
                quantity: 23
            }, {
                productName: 'Product_5',
                costPrice: 5,
                sellingPrice: 50,
                quantity: 23
            }]).then(function() {
                done();
            });
        });
    });
    var mockResponse = function(callback) {
        return {
            send: callback
        };
    };

    it("should return matching product list ", function(done) {
        productService.api({
            query: {
                size: 4,
                sortOrder: 'sellingPrice',
                filterType: 'gt',
                filterValue: 1
            }
        }, mockResponse(function(data) {
            expect(data.products.length).toEqual(4);
            expect(data.totalPrice).toEqual(14);
            expect(_.first(data.products).productName).toEqual('Product_4');
            done();
        }));
    });

    it("should return list according to matching filter ", function(done) {
        productService.api({
            query: {
                filterType: 'e',
                filterValue: 1
            }
        }, mockResponse(function(data) {
            expect(data.products.length).toEqual(1);
            expect(data.totalPrice).toEqual(1);
            expect(_.first(data.products).productName).toEqual('Product_1');
            done();
        }));
    });

    it("should return list according to matching size ", function(done) {
        productService.api({
            query: {
                size: 2
            }
        }, mockResponse(function(data) {
            expect(data.products.length).toEqual(2);
            done();
        }));
    });

    it("should return list according to matching sortOrder ", function(done) {
        productService.api({
            query: {
                sortOrder: 'sellingPrice'
            }
        }, mockResponse(function(data) {
            expect(data.products.length).toEqual(5);
            expect(data.totalPrice).toEqual(15);
            expect(_.first(data.products).productName).toEqual('Product_4');
            done();
        }));
    });

    it("should return 400 for invalid inputs", function(done) {
        productService.api({
            query: {
                filterType: '55',
                filterValue: 1
            }
        }, mockResponse(function(statusMassage, statusCode) {
            expect(statusMassage).toContain("Something went wrong check your qurery parameters");
            expect(statusCode).toEqual(400);
            done();
        }));
    });
});

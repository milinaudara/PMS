"use strict";
var expect = require("expect");
var Sequelize = require("sequelize");
var _ = require("underscore");
var dbConfig = require("./dbConfig")
var sequelize = new Sequelize(dbConfig.conString(), {
    logging: false
});
var model = require("../../server/model")(sequelize);
var productService = require("./../../server/productService")(sequelize);
describe("Product search ", function() {

    beforeEach(function(done) {
        sequelize.sync({
            force: true
        }).success(function() {
            model.Product.bulkCreate([{
                productName: 'Product_1',
                costPrice: 12.5,
                sellingPrice: 30.9,
                quantity: 23
            }, {
                productName: 'Product_3',
                costPrice: 12.5,
                sellingPrice: 30.9,
                quantity: 23
            }, {
                productName: 'Product_4',
                costPrice: 12.5,
                sellingPrice: 30.9,
                quantity: 23
            }, {
                productName: 'Sample',
                costPrice: 12.5,
                sellingPrice: 30.9,
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

        productService.search({
            params: {
                searchText: 'pr'
            }
        }, mockResponse(function(data) {
            expect(data.length).toEqual(3);
            expect(_.first(data).productId).toBeGreaterThan(0);
            done();
        }));
    });

    it("should return empty array when there is no searchText", function(done) {
        productService.search({
            params: {

            }
        }, mockResponse(function(data) {
            expect(data).toEqual([]);
            done();
        }));
    });
    
    it("should return empty array when there is no matching Product", function(done) {
        productService.search({
            params: {
                searchText: 'Item'
            }

        }, mockResponse(function(data) {
            expect(data).toEqual([]);

            done();
        }));
    });
});

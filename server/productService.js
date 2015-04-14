'use strict';
var _ = require('underscore');
module.exports = function(sequelize) {
    var model = require('./model')(sequelize);
    var util = require('util')
    var Product = model.Product;

    var checkCreateValidation = function(req) {
        checkEditValidation(req);
        req.checkBody('costPrice', 'Cost price Invalid').notEmpty().isFloat();
        req.checkBody('quantity', 'Quantity Invalid').notEmpty().isInt();

    }

    var checkEditValidation = function(req) {
        req.checkBody('productName', 'Product Name Invalid').notEmpty().isAlphanumeric();
        req.checkBody('sellingPrice', 'Selling price Invalid').notEmpty().isFloat().gte(req.body.costPrice);
    }

    return {
        create: function(req, res) {
            checkCreateValidation(req)
            if (req.validationErrors()) {
                res.send('There have been validation errors: ' + util.inspect(errors), 400);
                return;
            }
            var newProduct = {
                productName: req.body.productName,
                costPrice: req.body.costPrice,
                sellingPrice: req.body.sellingPrice,
                quantity: req.body.quantity
            }
            Product.create(newProduct).then(function(product) {
                res.status(200).json(product);
            });
        },
        edit: function(req, res) {
            checkEditValidation(req);
            if (req.validationErrors()) {
                res.send('There have been validation errors: ' + util.inspect(errors), 400);
                return;
            }
            Product.find(req.body.productId).then(function(product) {
                product.productName = req.body.productName;
                product.sellingPrice = req.body.sellingPrice;
                product.save().then(function(updatedProduct) {
                    res.status(200).json(updatedProduct);
                })
            });
        },
        search: function(req, res) {
            Product.findAll({
                where: {
                    productName: {
                        $like: req.params.searchText + '%'
                    },
                },
                limit: 10,
            }).then(function(products) {
                var productList = products.map(function(product) {
                    return {
                        productId: product.id,
                        productName: product.productName,
                        costPrice: product.costPrice,
                        sellingPrice: product.sellingPrice,
                        quantity: product.quantity
                    };
                });
                res.send(productList);
            })
        },
        api: function(req, res) {
            var size = req.query.size;
            var sortOrder = req.query.sortOrder;
            var filterType = req.query.filterType;
            var filterValue = req.query.filterValue;
            if (!size) {
                size = 100;
            }
            console.log(req.params);
            if (!sortOrder) {
                sortOrder = 'productName';
            }

            var array = [{
                filterType: "gt",
                condition: {
                    $gt: filterValue
                }
            }, {
                filterType: "lt",
                condition: {
                    $lt: filterValue
                }
            }]
            var wherefilter = _.find(array, function(filter) {
                return filter.filterType === filterType;
            });

            var filter = {
                limit: size,
                order: [sortOrder],
                where: {
                    costPrice: wherefilter.condition
                }
            }

            Product.findAll(filter).then(function(products) {
                var productList = products.map(function(product) {
                    return {
                        productId: product.id,
                        productName: product.productName,
                        costPrice: product.costPrice,
                        sellingPrice: product.sellingPrice,
                        quantity: product.quantity
                    };
                });
                res.send(productList);
            })
        }
    };
};

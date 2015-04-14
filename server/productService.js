'use strict';

module.exports = function(sequelize) {
    var model = require('./model')(sequelize);
    var Product = model.Product;

    return {
        create: function(req, res) {
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
            Product.find(req.body.id).then(function(product) {
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
                order: 'productName'
            }).then(function(products) {
                res.send(products);
            })
        }
    };
};

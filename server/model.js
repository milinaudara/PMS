'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {

    var Product = sequelize.define("Product", {
        productId: Sequelize.INTEGER,
        productName: Sequelize.STRING,
        costPrice: Sequelize.DECIMAL,
        sellingPrice: Sequelize.DECIMAL,
        quantity: Sequelize.INTEGER
    });

    return {
        Product: Product,

    };
};

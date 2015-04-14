'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {

    var Product = sequelize.define("Product", {
        id: { type: Sequelize.INTEGER, autoIncrement: true ,primaryKey: true},
        productName: Sequelize.STRING,
        costPrice: Sequelize.DECIMAL(10,2),
        sellingPrice: Sequelize.DECIMAL(10,2),
        quantity: Sequelize.INTEGER
    });

    return {
        Product: Product,
    };
};

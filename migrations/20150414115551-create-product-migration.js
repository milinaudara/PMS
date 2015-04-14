"use strict";

module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable('Products', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            costPrice: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false
            },
            sellingPrice: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }).complete(function() {
            migration.addIndex('Products', ['productName']).complete(done);
        });
    },

    down: function(migration, DataTypes, done) {
        migration.dropTable('Products').complete(done);
    }
};

var express = require("express");
var Sequelize = require("sequelize");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/../public")); 


var sequelize = new Sequelize(process.env.DATABASE_URL ||"mysql://udara:123456@localhost:3306/pms_db");

var Product = sequelize.define("Product", {
    productId: Sequelize.INTEGER,
    productName: Sequelize.STRING,
    costPrice: Sequelize.STRING,
    sellingPrice: Sequelize.STRING,
    quantity: Sequelize.STRING
});
 

var create = function (req, res) {
    var newUser={
        productName: req.body.productName,
        costPrice:req.body.costPrice,
        sellingPrice: req.body.sellingPrice,
        quantity:req.body.quantity
    }
    Product.create(newUser).then(function () {
        res.send(200);
    });
};
 

 
sequelize.sync().then(function (err) {
    app.post("/product/add", create);
    app.listen(5000);
});
 


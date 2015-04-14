var express = require("express");
var Sequelize = require("sequelize");
var bodyParser = require("body-parser");
var expressValidator = require('express-validator')
var customValidation = require('./customValidation')()
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(expressValidator(customValidation.options));
app.use(express.static(__dirname + "/../public"));

var sequelize = new Sequelize(process.env.DATABASE_URL || "mysql://udara:123456@localhost:3306/pms_db" ,{
  omitNull: true
});

var productService = require("./productService")(sequelize);

var migrations = __dirname + "/../migrations/";

sequelize.getMigrator({
    path: migrations
}).migrate().success(function(err) {
    app.post("/product", productService.create);
    app.get("/product/:searchText", productService.search);
    app.put("/product", productService.edit);
    app.listen(process.env.PORT || 5000);
});

var customValidation = require('./../../server/customValidation')();
var expressValidator = require('express-validator')(customValidation.options);

exports.reqStub = function(done) {
    var req = {
        query: {},
        body: {},
        params: {},
        param: function(name) {
            return this.params[name];
        }
    };
    return expressValidator(req, {}, function() {
        return done(req);
    });
};

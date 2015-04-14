'use strict';

module.exports = function() {
    return {
        options: {
            customValidators: {
                gte: function(param, num) {
                    return parseFloat(param) >= parseFloat(num)
                }
            }

        }
    };
};

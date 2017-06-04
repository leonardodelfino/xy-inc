'use strict';

/**
 * Route to handle requisitions for models
 * 
 * @param {Object} app Express app
 */
module.exports = (app) => {

    let dynamicModelCtrl = require('../controllers/dynamicModelController');

    app.route('/api/:model')
        .post(dynamicModelCtrl.create)
        .get(dynamicModelCtrl.find);

    app.route('/api/:model/:_id')
        .get(dynamicModelCtrl.find)
        .put(dynamicModelCtrl.update)
        .delete(dynamicModelCtrl.remove);
};
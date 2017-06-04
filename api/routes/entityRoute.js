'use strict';

/**
 * Route to handle requisitions for model Entity
 * 
 * @param {Object} app Express app
 */

module.exports = (app) => {

    let entityCtrl = require('../controllers/entityController');

    app.route('/api/entity')
        .get(entityCtrl.find)
        .post(entityCtrl.create);

};
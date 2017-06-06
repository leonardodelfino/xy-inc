'use strict';

const mongoose = require('mongoose');
let Entity = mongoose.model('Entity');

/**
 * Find a record
 * 
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Next route for handling errors
 */
exports.find = (req, res, next) => {
    let params = req.params;

    Entity.find(params).then((records) => {
        res.json(records);
    }).catch(next);
};

/**
 * Create a new record
 * 
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Next route for handling errors
 */
exports.create = (req, res, next) => {
    let newEntity = new Entity(req.body);

    if(newEntity.name == "entity") {
        next(Error(`Can not create a model with the reserved 'entity' name`));
        return;
    }

    newEntity.save().then((newRecord) => {
        res.json(newRecord);
    }).catch(next);
};

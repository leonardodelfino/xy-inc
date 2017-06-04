'use strict';

let dynamicHelper = require('../helpers/dynamicModelHelper');

/**
 * Add a new record on model
 * 
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Next route for handling errors
 */
exports.create = (req, res, next) => {
    let params = req.params;
    let attrs = req.body;

    dynamicHelper.getModel(params.model)
        .then((Model) => {
            let record = new Model(attrs);
            return record.save();
        })
        .then((newRecord) => {
            res.json(newRecord);
        })
        .catch(next);
}

/**
 * Find a record on model
 * 
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Next route for handling errors
 */
exports.find = (req, res, next) => {
    let params = req.params;

    dynamicHelper.getModel(params.model)
        .then((Model) => {
            let query = params;
            delete params.model;
            return Model.find(query);
        })
        .then((records) => {
            res.json(records);
        })
        .catch(next);
}

/**
 * Update a record
 * 
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Next route for handling errors
 */
exports.update = (req, res, next) => {
    let params = req.params;
    let update = req.body;

    dynamicHelper.getModel(params.model)
        .then((Model) => {
            return Model.update({ _id: params._id }, update);
        })
        .then((result) => {
            res.json(result);
        })
        .catch(next);
}

/**
 * Remove a record
 * 
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Next route for handling errors
 */
exports.remove = (req, res, next) => {
    let params = req.params;

    dynamicHelper.getModel(params.model)
        .then((Model) => {
            return Model.remove({ _id: params._id });
        })
        .then((result) => {
            res.json(result);
        })
        .catch(next);
}
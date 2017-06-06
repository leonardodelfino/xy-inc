'use strict';

const mongoose = require('mongoose');
let Entity = mongoose.model('Entity');

/**
 * Converts user input types to mongodb natives
 * 
 * @param {String} type Type input by user
 * @returns Schema Type
 */
let convertTypes = (type) => {
    switch (type.toLowerCase()) {

        case "number":
        case "int":
        case "integer":
        case "float":
        case "double":
            return Number;

        case "date":
        case "datetime":
            return Date;

        case "boolean":
        case "bool":
            return Boolean;
        
        default:
            return String;
    }
}

/**
 * Load a module in mongoose
 * 
 * @param {String} name Name of module
 * @param {Function} callback Callback function to work with the created module
 */
let loadModel = (name) => {
    return new Promise((resolve, reject) => {

        Entity.findOne({ name: name }, (err, model) => {
            if (!model) {
                reject(Error(`Model ${name} not found!`));
                return;
            }

            let options = {
                versionKey: false,
                timestamps: true
            }

            let attributes = {};
            for (let attr of model.attributes) {
                attributes[attr.name] = {
                    name: attr.name,
                    required: attr.required || false,
                    type: convertTypes(attr.type)
                }
            }

            let newSchema = new mongoose.Schema(attributes, options);
            resolve(mongoose.model(name, newSchema));
        });
    });
};

/**
 * Returns the Mongoose module for the informed Schema. Loads the module if 
 * it has not been previously loaded.
 * 
 * @param {String} model Name of module
 * @param {Function} callback Callback function to work with the created module
 * @returns 
 */
exports.getModel = (model) => {

    return new Promise((resolve, reject) => {
        let loadedModels = mongoose.modelNames();

        if (loadedModels.includes(model)) {
            resolve(mongoose.model(model));
        } else {
            resolve(loadModel(model));
        }
    });
} 

'use strict';

const Joi = require('joi');

const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email({ minDomainAtoms:2 }),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    company: Joi.string(),
    function: Joi.string()
});


module.exports = schema;
'use strict';

const Joi = require('joi');
const Boom = require('boom');
const userSchema = require('../schemas/user');


module.exports = [
    {
        method: 'post',
        path: '/auth',
        options: {

            handler: async (request, h) => {

                const { userService } = request.services();
                const { securityService } = request.services();

                let authentification = await userService.authentification(request.payload,securityService);
                if (authentification.length > 0){
                    return h.response('OK').code(200);
                }
                else {
                    return h.response('KO').code(404);
                }


            },
            validate:{
                payload:{
                    login: Joi.string().required(),
                    password: Joi.string().min(8).required()
                }
            },
            tags : ['api']
        }
    },


];
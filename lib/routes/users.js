'use strict';

const Joi = require('joi');
const Boom = require('boom');
const userSchema = require('../schemas/user');


module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {

            handler: async (request, h) => {

                const { userService } = request.services();
                const { securityService } = request.services();
                const { mailService } = request.services();
                let password = request.payload.userSchema.password
                let userCreated = await userService.createUser(request.payload,securityService);
                mailService.sendMailWhenUserCreated(userCreated,password);
                return h.response(userCreated).code(201);


            },
            validate:{
                payload:{
                    userSchema
                }
            },
            tags : ['api']
        }
    },

    {
        method: 'delete',
        path: '/user/{id}',
        options: {

            handler: async (request, h) => {
                const {userService} = request.services();

                var userToDelete = await userService.deleteUser(request.params);
                if (userToDelete) {
                    return h.response(userToDelete).code(204);
                }
                else {
                    return Boom.notFound('L\'utilisateur recherché n\'a pas été trouvé');
                }


            },

            validate: {
                params: {
                    id: Joi.number()
                }
            },
            tags: ['api']
        }
    },


    {
        method: 'POST',
        path: '/users/generate',
        options: {
            handler: async (request, h) => {
                const { userService } = request.services();
                const { securityService } = request.services();
                return await userService.generateUsers(100,securityService);
            },
            tags : ['api']

        }
    },

    {
        method: 'get',
        path: '/user/{id}',

        options: {
            handler: async (request, h) => {
                const {userService} = request.services();
                var userToReturn = await userService.getUserById(request.params);
                if (userToReturn) {
                    return h.response(userToReturn).code(200);
                }
                else {
                    return Boom.notFound('L\'utilisateur recherché n\'a pas été trouvé');
                }
            },
            validate: {
                params: {
                    id: Joi.number()
                }
            },

            tags: ['api']

        }
    },


    {
        method: 'get',
        path: '/users',
        options: {
            handler: async (request, h) => {
                const { userService } = request.services();
                return await userService.getAllUsers();
            },
            tags : ['api']

        }
    },

    {
        method: 'put',
        path: '/user/{id}',
        options: {

            handler: async (request, h) => {
                const { userService } = request.services();
                const { securityService } = request.services();
                const { mailService } = request.services();
                var userToUpdate = await userService.updateUser(request.params,request.payload,securityService);
                if (userToUpdate) {
                    mailService.sendMailWhenUserUpdated(userToUpdate);
                    return h.response(userToUpdate).code(201);
                }
                else {
                    return Boom.notFound('L\'utilisateur recherché n\'a pas été trouvé');
                }
            },

            validate:{
                payload:{
                    userSchema
                },
                params:{
                    id: Joi.number()
                }
            },
            tags : ['api']
        }
    },

    {
        method: 'put',
        path: '/user/forgottenPassword/{id}',
        options: {

            handler: async (request, h) => {
                const { userService } = request.services();
                const { securityService } = request.services();
                const { mailService } = request.services();
                var userToUpdate = await userService.updatePasswordUser(request.params,request.payload,securityService);
                if (userToUpdate) {
                    mailService.sendMailWhenForgottenPassword(userToUpdate);
                    return h.response(userToUpdate).code(201);
                }
                else {
                    return Boom.notFound('L\'utilisateur recherché n\'a pas été trouvé');
                }
            },

            validate:{
                payload:{
                    password: Joi.string().min(8).required()
                },
                params:{
                    id: Joi.number()
                }
            },
            tags : ['api']
        }
    }
];
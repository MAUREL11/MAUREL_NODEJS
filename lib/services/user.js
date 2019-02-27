'use strict';

const { Service } = require('schmervice');
const Boom = require('boom');
const faker = require('faker');

module.exports = class UserService extends Service {


    async getAllUsers() {
        const { User } = this.server.models();
        const users = await User.query();
        return users;
    };

    async createUser(payload,securityService) {
        const { User } = this.server.models();
        const userToCreate = payload.userSchema;
        userToCreate.password = await securityService.encryptPassword(userToCreate.password);
        return await User.query().insert(userToCreate);
    };

    async getUserById(parameter) {

        const { User } = this.server.models();
        const userid = parameter.id;
        const user = await User.query().findById(userid);
        return user;
    };

    async updateUser(parameter, payload, securityService) {
        const { User } = this.server.models();
        let userUpdated = payload.userSchema;
        if (userUpdated.password){
            userUpdated.password = await securityService.encryptPassword(userUpdated.password);
        }

        userUpdated = await User.query().updateAndFetchById(parameter.id, userUpdated);
        return userUpdated;
    };


    async updatePasswordUser(parameter, payload, securityService) {
        const { User } = this.server.models();
        let userToUpdate = await this.getUserById(parameter);
        let newPassword = payload.password;

        newPassword = await securityService.encryptPassword(newPassword);
        userToUpdate.password = newPassword;

        let userUpdated = await User.query().updateAndFetchById(parameter.id, userToUpdate);
        return userUpdated;
    };

    async deleteUser(parameter) {
        const { User } = this.server.models();
        const userDeleted = await User.query().deleteById(parameter.id);
        return userDeleted;

    }

    async generateUsers(number, securityService) {
        const { User } = this.server.models();
        var users = []
        let compteur = 0;
        while (compteur < number) {
            let userToCreate = {
                'userSchema': {
                    'login': faker.Internet.userName(),
                    'password': faker.Internet.userName(8),
                    'email': faker.Internet.email(),
                    'firstname': faker.Name.lastName(),
                    'lastname': faker.Name.lastName(),
                    'company': faker.Company.companyName(),
                    'function': faker.Name.lastName()
                }
            };
            this.createUser(userToCreate, securityService);
            users.push(userToCreate);
            compteur++;

        }

        return users;
    }

    async authentification(payload,securityService){
        const { User } = this.server.models();
        const login = payload.login;
        let password = payload.password;
        password = await securityService.encryptPassword(password);
        const user = await User.query().where('login', '=', login).andWhere('password', '=',password);
        return user;
    }

};
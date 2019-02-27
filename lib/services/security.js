'use strict';
const Crypto = require('crypto');


module.exports = class SecurityService {


    async encryptPassword(password) {
        const passwordEncrypted = await Crypto.createHash('sha1').update(password).digest('hex');
        return passwordEncrypted;
    };




};
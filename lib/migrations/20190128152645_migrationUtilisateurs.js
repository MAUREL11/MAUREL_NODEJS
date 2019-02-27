'use strict';

exports.up = function (knex, Promise) {
    knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return knex.schema.withSchema('public').createTable('users', function (table) {
                table.increments('id').primary();
                table.string('login');
                table.string('password');
                table.string('email');
                table.string('firstname');
                table.string('lastname');
                table.string('company');
                table.string('function');
            });
        }


    });
    knex.schema.hasTable('users').then(function (exists) {
        if (exists) {
            var toInsert = {};
            toInsert.id = 0;
            toInsert.login = 'login';
            toInsert.password = 'password';
            toInsert.email = 'email@mail.com';
            toInsert.firstname = 'Toto';
            toInsert.lastname = 'Dupont';
            toInsert.company = 'Company';
            toInsert.function = 'Function';
            return knex.insert(toInsert).into('users').return({inserted: true});
        }
    });

};

exports.down = function (knex, Promise) {
    knex.schema.hasTable('users').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('users');
        }
    });

};

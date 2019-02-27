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
    
};

exports.down = function (knex, Promise) {
    knex.schema.hasTable('users').then(function (exists) {
        if (exists) {
            return knex.schema.dropTable('users');
        }
    });

};

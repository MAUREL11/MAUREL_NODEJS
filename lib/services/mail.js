'use strict';

const {Service} = require('schmervice');
const NodeMailer = require('nodemailer');
const Mailgen = require('mailgen');

require('dotenv').config()

const transporteur = NodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.PASSWORD_MAIL_USER
    }
});

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
    }
});

module.exports = class MailService extends Service {


    async sendMailWhenUserCreated(userCreated, passwordNotEncrypted) {

        const infoEmail = {
            body: {
                name: userCreated.firstname + ' ' + userCreated.lastname,
                intro: 'Inscription',
                table: {
                    data: [
                        {
                            item: 'Nom d\'utilisateur',
                            information: userCreated.login
                        },
                        {
                            item: 'Mot de passe',
                            information: passwordNotEncrypted
                        }
                    ],
                    columns: {
                        customWidth: {
                            item: '20%',
                            price: '20%'
                        },
                        customAlignment: {
                            price: 'right'
                        }
                    }
                }
            }
        };

        const corpsMail = mailGenerator.generate(infoEmail);

        const textMail = mailGenerator.generatePlaintext(infoEmail);

        const optionsEnvoi = {
            from: process.env.MAIL_USER,
            to: userCreated.email,
            subject: 'Inscription',
            html: corpsMail,
            text: textMail
        };

        await transporteur.sendMail(optionsEnvoi, (err, info) => {

            if (err) {
                throw (err);
            }
        });
    };


    async sendMailWhenUserUpdated(userUpdated) {

        const infoEmail = {
            body: {
                name: 'Changements effectués sur votre compte',
                intro: 'Bonjour, des changements ont étés opérés sur votre compte.',
                action: {
                    instructions: 'Pour vous rendre sur le site, clickez sur le lien suivant :',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Se rendre vers le site',
                        link: 'http://localhost:3000/documentation'
                    }
                },
            }
        };

        const corpsMail = mailGenerator.generate(infoEmail);

        const textMail = mailGenerator.generatePlaintext(infoEmail);

        const optionsEnvoi = {
            from: process.env.MAIL_USER,
            to: userUpdated.email,
            subject: 'Inscription',
            html: corpsMail,
            text: textMail
        };

        await transporteur.sendMail(optionsEnvoi, (err, info) => {

            if (err) {
                throw (err);
            }
        });
    };


    async sendMailWhenForgottenPassword(userUpdated) {

        const infoEmail = {
            body: {
                name: 'Modification du mot de passe',
                intro: 'Bonjour, votre mot de passe a bien été changé.',
                action: {
                    instructions: 'Pour vous rendre sur le site, clickez sur le lien suivant :',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Se rendre vers le site',
                        link: 'http://localhost:3000/documentation'
                    }
                },
            }
        };

        const corpsMail = mailGenerator.generate(infoEmail);

        const textMail = mailGenerator.generatePlaintext(infoEmail);

        const optionsEnvoi = {
            from: process.env.MAIL_USER,
            to: userUpdated.email,
            subject: 'Modification du mot de passe',
            html: corpsMail,
            text: textMail
        };

        await transporteur.sendMail(optionsEnvoi, (err, info) => {

            if (err) {
                throw (err);
            }
        });
    };


};
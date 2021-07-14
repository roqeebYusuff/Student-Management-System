const nodemailer = require('nodemailer');
const emailTemplate = require('email-templates');

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
    }
});

const sendMail = (from, to, subject, tplname, locals) => {

}

const email = new emailTemplate({
    message: {
      from: process.env.USERNAME
    },
    transport: transporter,
    send: true
});


//   email
//     .send({
//       template: 'signup',
//       message: {
//         to: 'test@mail.com'
//       },
//       locals: {
//         name: 'Elon'
//       }
//     })
//     .then(console.log)
//     .catch(console.error);

module.exports = { email }
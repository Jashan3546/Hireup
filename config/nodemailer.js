const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'kambozjashan@gmail.com',
        pass: 'vhotolgdkxgqeigt'
    },
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        (err, template) => {
            if (err) {
                console.log('error in rendring template', err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}

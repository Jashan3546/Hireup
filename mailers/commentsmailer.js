const nodemailer = require('../config/nodemailer')


exports.newComment = (comment) => {
    console.log("inside comment mailer ", comment);
    let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/newcomment.ejs');
    nodemailer.transporter.sendMail({
        from: 'kambozjashan@gmail.com', // sender address
        to: comment.user.email, // list of receivers
        subject: "New comment published", // Subject line
        //text: "Hello world?", // plain text body
        html: htmlString, // html body
    },
        (err, info) => {
            if (err) {
                console.log('error in sending mail', err);
                return;
            }
            console.log('message sent', info);
            return;
        });
}
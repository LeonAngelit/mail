const nodemailer = require("nodemailer");
const conf = require('../conf/configuration');

class EmailService {
  constructor() {}
  async sendEmail(data, receiver) {
    try{
      let transporter = nodemailer.createTransport({
        host: `${conf.mailServer}`,
        port: 465,
        secure: true, 
  
        auth: {
          user: `${conf.userMail}`,
          pass: `${conf.appPass}`,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
       await transporter.sendMail({
        from: `${data.name}" <${conf.userMail}>`, // sender address
        to: receiver, // list of receivers
        subject: `${data.subject}`, // Subject line
        html: `${data.htmlBody}`, // html body
      });
  
      return 1

    } catch(err){
      return err.message
    }

  }
}

module.exports= EmailService;

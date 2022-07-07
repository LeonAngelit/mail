const Joi = require('joi');


const name = Joi.string().min(3).max(30).pattern(/^[a-zA-Z\s\.]*$/);
const mailSender = Joi.string().email();
const phone = Joi.string().length(9).pattern(/^[0-9]+$/);
const subject = Joi.string().min(4).max(140);
const htmlBody = Joi.string().min(5);

const sendMailSchema = Joi.object({
  name: name.required(),
  mailSender:mailSender.required(),
  phone: phone,
  subject: subject.required(),
  htmlBody: htmlBody.required(),
});



module.exports = {sendMailSchema}

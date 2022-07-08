const Joi = require('joi');


const name = Joi.string().min(3).max(60).pattern(/^([a-zA-ZÀ-ÿ\u00f1\u00d1]\s*\.*){2,60}$/);
const mailSender = Joi.string().email();
const phone = Joi.string().length(9).pattern(/^[6798]\d{8}$/);
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

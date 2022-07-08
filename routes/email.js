const express = require("express");
const EmailService = require("../services/mail.service");
const conf = require('../conf/configuration');
const bcrypt = require('bcrypt');


const router = express.Router();
//Instanciamos el servicio que hemos importado
const service = new EmailService();
//Establecemos la ruta que desencadena la respuesta del servicio, usando el parámetro de la petición para buscar
const validatorHandler = require('./../midlewares/validator.handler');

const {sendMailSchema} = require("../schemas/sendMail.schema");
const { authKey } = require("../midlewares/auth.handler");
const {jwtAuth} = require('../midlewares/auth.handler');

bcrypt.hash(conf.key, 10, function(err, encrypted){
  console.log(encrypted);
})


router.get("/", async (req, res, next) => {
  console.log(req['headers']);
  try {
    res.json([{
      API: "API-Leon",
    }]);
  } catch (error) {
    next(error);
  }
});


router.post('/',
validatorHandler(sendMailSchema, 'body'),
jwtAuth('headers'),
async (req, res, next) => {
  try {
    const data = req.body;
    const formattedBody = `
    <h3>Nombre: ${data.name} </h3><br>
    <h3>Dirección: ${data.mailSender}</h3><br>
    <h3>Teléfono: ${data.phone}</h3><br>
    <h3>Mensaje:</h3><br>
    <p>${data.htmlBody}</p>`;
    const original = data.htmlBody;
    data.htmlBody = formattedBody;

    const email = await service.sendEmail(data, 'contact@agleondev.com');
    const response = await service.sendEmail({
    name: conf.nombreLeon,
    mailSender: `${conf.userMail}`,
    subject: `RE: ${data.subject}`,
    htmlBody: conf.responseBody(data.name, original)
  }, data.mailSender)
    res.header("Access-Control-Allow-Origin", "*");
    res.json({email, response});
  } catch (error) {
    next(error);
  }
});


module.exports = router;

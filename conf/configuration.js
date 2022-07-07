const configuration = {

    nombreLeon: "Leon 🧑‍💻",
    appPass: process.env.APP_PASS,
    userMail: process.env.USER_MAIL,
    mailServer: process.env.MAIL_SERVER,
    key: process.env.API_KEY,
    pkey: process.env.P_KEY,
    authp: process.env.AUTH_P,
    responseBody: function(name, body){
        name = name.split(' ')[0];
        return `
        <h3>Saludos, ${name}! 🙂</h3><br>
        <p>He recibido tu mensaje correctamente, te responderé lo antes posible. No es necesario que respondas a este mensaje, para
        cualquier otra cuestión puedes escribir a contact@agleondev.com</p><br>

        <b>Aquí tienes una copia de tu mensaje:</b><br>
        <em>${body}</em><br>

        <br>
        <br>

        <h3>🇬🇧 Greetings, ${name}! 🙂</h3><br>
        <p>I've succesfully received your mail, I'll reply as soon as possible. It's not neccesary to reply to this message, for
        any other question you can write to contact@agleondev.com</p><br>

        <b>Here is a copy of your message:</b><br>
        <em>${body}</em><br>

        `
    }
}

module.exports = configuration;

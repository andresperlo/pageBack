require('dotenv').config()
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENTE_ID_G,
    process.env.CLIENTE_SECRET_G, // Client Secret
    process.env.REDIRECT_URL_G // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN_G
});

const accessToken = oauth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // upgrade later with STARTTLS
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENTE_ID_G,
        clientSecret: process.env.CLIENTE_SECRET_G,
        refreshToken: process.env.REFRESH_TOKEN_G,
        accessToken: accessToken
    }
});

const sendNodeMail = (email, subject, msg) => {
    //La función recibe por parámetros los datos a llenar en el correo
    const mailOptions = {
        from: `DecoDevs <proyectofinalrestorant@gmail.com>`, // email sender
        to: `${email}`, // email receiver
        subject: subject,
        html: `
        <div>
            <h1 style='text-align: center'>${msg}</h1>
            <h2 style='text-align: center'>Gracias Por Contactarnos</h2>
            <h3 style='text-align: center'>En Breve Nos Pondremos en Contacto por Telefono o via Mail</h3>
        </div>    
        ` // html body | contenido del mail
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendNodeMail;

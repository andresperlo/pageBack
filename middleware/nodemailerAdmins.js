require('dotenv').config()
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENTE_ID_G,
    process.env.CLIENTE_SECRET_G, 
    process.env.REDIRECT_URL_G
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN_G
});

const accessToken = oauth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: false, 
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENTE_ID_G,
        clientSecret: process.env.CLIENTE_SECRET_G,
        refreshToken: process.env.REFRESH_TOKEN_G,
        accessToken: accessToken
    }
});

const sendNodeMail = (email, subject, msg, celphone, textarea) => {

    const mailOptions = {
        from: `Asturias F & D <proyectofinalrestorant@gmail.com>`, 
        to: `andresperlo5@gmail.com, martinfernando-sandander@hotmail.com, marcobaiad@gmail.com`, 
        subject: subject,
        html: `
            <div>
               <h1 style='text-align: center'>${msg}</h1>
                <h3>Email de contacto: ${email}</h3>
                <h3>Celular de contacto: ${celphone}</h3>
                <h3>Mensaje: ${textarea}</h3>
            </div>    
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendNodeMail;

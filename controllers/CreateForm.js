const { validationResult } = require('express-validator')
const FormModel = require('../models/modelForm');
const sendNodeMail = require('../middleware/nodemailer');
const sendNodeMailAdmin = require('../middleware/nodemailerAdmins');

exports.CreateForm = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { body } = req

    let name = ({ name: body.name })
    let lastname = ({ lastname: body.lastname })
    let celphone = ({ celphone: body.celphone })
    let email = ({ email: body.email })
    let textarea = ({ textarea: body.textarea })

    let mailExists = await FormModel.findOne({ email: body.email });
    if (mailExists) {
        console.log(mailExists)
        return res.status(400).json({ mensaje: 'El mail ya se encuentra en uso' })
    }

    const user = {
        name: body.name,
        lastname: body.lastname,
        celphone: body.celphone,
        email: body.email,
        textarea: body.textarea
    };

    const usuario = new FormModel(user);

    const mailContent = {
        email: body.email,
        subject: 'Mensaje Recibido ',
        msg: '¡Bienvenido ' + body.name + '!'
    }

    const mailContentAdmin = {
        email: body.email,
        subject: 'Usuario Nuevo ' + body.name,
        msg: '¡Dale la Bienvenida a ' + body.name + ' ' + body.lastname + '!',
        celphone: body.celphone,
        textarea: body.textarea
    }




    try {
        await usuario.save();
        await sendNodeMail(mailContent.email, mailContent.subject, mailContent.msg)
        await sendNodeMailAdmin(mailContentAdmin.email, mailContentAdmin.subject, mailContentAdmin.msg, mailContentAdmin.celphone, mailContentAdmin.textarea)
        res.send({ mensaje: 'Registro ok' })
    } catch (error) {
        res.status(500).send(error);
    }
}
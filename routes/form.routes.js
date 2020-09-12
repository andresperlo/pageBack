const express = require('express');
const { check } = require('express-validator')
const router = express.Router();

const ControllerCreateForm = require('../controllers/CreateForm')

router.post('/', [
    check('name', 'Campo Nombre Vacio').notEmpty(),
    check('lastname', 'Campo Apellido Vació').notEmpty(),
    check('celphone', 'Campo Celular Vacio').notEmpty(),
    check('email', 'Campo Mail Vacio').notEmpty(),
    check('email', 'Ingresar un Mail Correcto').isEmail(),
    check('textarea', 'Campo textarea Vacio').notEmpty(),
    check('textarea', 'Campo textarea minimo 10 catacteres').isLength({min: 10}),
    check('textarea', 'Campo textarea maximo 200 catacteres').isLength({max: 200})
], ControllerCreateForm.CreateForm)

module.exports = router;

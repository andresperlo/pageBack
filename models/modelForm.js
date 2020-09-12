const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        trim: true,
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
    },
    celphone:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    textarea:{
        type: String,
        trim: true,
        required: true
    }
    
})
 
const FormModel = mongoose.model('usuario', FormSchema)

module.exports = FormModel;
const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fecha_ingreso: {
        type: Date,
        required: true
    },
    rareza: {
        type: String,
        enum: ['Comun', 'Alta', 'Exotico'],
        required: true
    }
});

module.exports = mongoose.model('Animal', animalSchema);

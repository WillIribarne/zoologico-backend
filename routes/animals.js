const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

// Crear un nuevo animal
router.post('/', async (req, res) => {
    const { nombre, fecha_ingreso, rareza } = req.body;

    const animal = new Animal({
        nombre,
        fecha_ingreso: new Date(fecha_ingreso).toISOString().split('T')[0], // Formatear la fecha
        rareza
    });

    try {
        const nuevoAnimal = await animal.save();
        res.status(201).json(nuevoAnimal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener todos los animales
router.get('/verZoologico', async (req, res) => {
    try {
        const animales = await Animal.find();
        const formattedAnimales = animales.map(animal => ({
            ...animal.toObject(),
            fecha_ingreso: animal.fecha_ingreso.toISOString().split('T')[0] // Formatear la fecha
        }));
        res.json(formattedAnimales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un animal por ID
router.get('/verAnimal_ID/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (animal == null) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }
        const formattedAnimal = {
            ...animal.toObject(),
            fecha_ingreso: animal.fecha_ingreso.toISOString().split('T')[0] // Formatear la fecha
        };
        res.json(formattedAnimal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un animal
router.put('/:id', async (req, res) => {
    const { nombre, fecha_ingreso, rareza } = req.body;

    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }

        animal.nombre = nombre;
        animal.fecha_ingreso = new Date(fecha_ingreso).toISOString().split('T')[0]; // Formatear la fecha
        animal.rareza = rareza;

        const animalActualizado = await animal.save();
        res.json(animalActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un animal
router.delete('/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }

        await Animal.deleteOne({ _id: req.params.id });
        res.json({ message: 'Animal eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
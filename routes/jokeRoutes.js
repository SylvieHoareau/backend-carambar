import express from 'express';
import { addJoke, getAllJokes, updateJokeById, deleteJokeById  } from '../controllers/jokeController.js';
const router = express.Router();

// Route pour ajouter une blague
router.post('/', addJoke);

// Route pour obtenir toutes les blagues
router.get('/', getAllJokes);

// Route pour obtenir une blague par son ID
router.get('/:id', getAllJokes);

// Route pour mettre à jour une blague par son ID
router.put('/:id', updateJokeById);

// Route pour supprimer une blague par son ID
router.delete('/:id', deleteJokeById);

// Exporter le routeur
export default router;

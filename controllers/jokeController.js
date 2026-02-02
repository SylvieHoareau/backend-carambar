// On simule nos données de blagues
// const jokes = [
//     { id: 1, joke: 'Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau.' },
//     { id: 2, joke: 'Quel est le comble pour un électricien ? De ne pas être au courant.' }
// ];
import Joke from '../models/jokeModel.js';

// Obtenir toutes les blagues
export const getAllJokes = async (req, res) => {
    try {
        const jokes = await Joke.findAll();
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter une nouvelle blague
export const addJoke = async (req, res) => {
    try {
        const newJoke = await Joke.create({
            question: req.body.question,
            response: req.body.response
        });
        res.status(201).json({ 
            message: 'Blague ajoutée avec succès !', 
            joke: newJoke
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir une blague par son ID
export const getJokeById = (req, res) => {
    const jokeId = parseInt(req.params.id, 10);
    const joke = jokes.find(j => j.id === jokeId);
    if (joke) {
        res.json(joke);
    } else {
        res.status(404).json({ message: 'Blague non trouvée !' });
    }
};

// Mettre à jour une blague par son ID
export const updateJokeById = (req, res) => {
    const jokeId = parseInt(req.params.id, 10);
    const updatedJoke = req.body;
    const index = jokes.findIndex(j => j.id === jokeId);
    if (index !== -1) {
        jokes[index] = updatedJoke;
        res.json({ message: 'Blague mise à jour avec succès !', joke: updatedJoke });
    } else {
        res.status(404).json({ message: 'Blague non trouvée !' });
    }
};

// Supprimer une blague par son ID
export const deleteJokeById = (req, res) => {
    const jokeId = parseInt(req.params.id, 10);
    const index = jokes.findIndex(j => j.id === jokeId);
    if (index !== -1) {
        jokes.splice(index, 1);
        res.json({ message: 'Blague supprimée avec succès !' });
    } else {
        res.status(404).json({ message: 'Blague non trouvée !' });
    }
};
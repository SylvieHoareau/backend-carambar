import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import sequelize from '../models/index.js';

// Tests des endpoints des blagues
describe('Tests des endpoints des blagues', () => {
    // Avant les tests, on synchronise la base de données
    beforeAll(async() => {
        // En forçant la recréation des tables pour un état propre
        await sequelize.sync({ force: true});
    });

    beforeEach(async() => {
        // On vide les tables avant chaque test pour s'assurer de l'isolation des tests
        await sequelize.sync({ force: true });
    });

    // Après les tests, on ferme la connexion à la base de données
    afterAll(async() => {
        await sequelize.close();
    });

    describe('GET /api/jokes', () => {
        it('devrait retourner une liste vide au début', async() => {
            const res = await request(app).get('/api/jokes');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(0);
        });
    });

    describe('POST /api/jokes', () => {
        it('devrait ajouter une nouvelle blague', async() => {
            const nouvelleBlague = {
                question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?",
                response: "Parce que sinon ils tombent dans le bateau."
            };

            const res = await request(app)
                .post('/api/jokes')
                .send(nouvelleBlague);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'Blague ajoutée avec succès !');
            expect(res.body).toHaveProperty('joke');
            expect(res.body.joke).toHaveProperty('id');
            expect(res.body.joke.question).toBe(nouvelleBlague.question);
        });
    });

    describe('GET /api/jokes/:id', () => {
        it('devrait récupérer une blague par son ID', async() => {
            // D'abord, on ajoute une blague pour être sûr qu'elle existe
            const nouvelleBlague = {
                question: "Quel est le comble pour un électricien ?",
                response: "De ne pas être au courant."
            };

            const postRes = await request(app)
                .post('/api/jokes')
                .send(nouvelleBlague);

            const blagueId = postRes.body.joke.id;

            // Maintenant, on la récupère
            const getRes = await request(app).get(`/api/jokes/${blagueId}`);

            expect(getRes.statusCode).toBe(200);
            expect(getRes.body).toHaveProperty('id', blagueId);
            expect(getRes.body.question).toBe(nouvelleBlague.question);
        });
    });

    describe('GET /api/jokes/:id - blague non trouvée', () => {
        it('devrait retourner 404 si la blague n\'existe pas', async() => {
            const res = await request(app).get('/api/jokes/9999'); // ID improbable

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message', 'Blague non trouvée !');
        });
    });

    // Flux complet : Création et Récupération
    describe('Flux complet : Création et Récupération', () => {
        it('devrait créer une blague puis la récupérer dans la liste', async () => {
            const nouvelleBlague = {
                question: "Pourquoi les développeurs détestent-ils la nature ?",
                response: "Parce qu'il y a trop de bugs."
            };

            // On envoie la blague (POST)
            const postRes = await request(app)
                .post('/api/jokes')
                .send(nouvelleBlague);
                
            expect(postRes.statusCode).toBe(201);
            expect(postRes.body).toHaveProperty('joke');
            expect(postRes.body.joke.question).toBe(nouvelleBlague.question);

            // On vérifie qu'elle est bien dans la liste (GET)
            const getRes = await request(app).get('/api/jokes');

            expect(getRes.statusCode).toBe(200);
            expect(getRes.body.length).toBe(1);
            expect(getRes.body[0].question).toBe(nouvelleBlague.question);
        })
    });
});


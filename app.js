import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';
import jokeRoutes from './routes/jokeRoutes.js';
import sequelize from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de sécurité pour les en-têtes HTTP
app.use(helmet());

// Configuration CORS
const corsOptions = {
    origin: '*', // Autoriser toutes les origines
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Activer CORS avec les options définies
app.use(cors(corsOptions));

// Limiteur de taux pour prévenir les abus
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre (ici, par 15 minutes)
    message: { message: "Trop de requêtes provenant de cette IP, veuillez réessayer plus tard." }
});

// Appliquer le rate limiter à toutes les requêtes
app.use(limiter);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware pour lire le JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend de Carambar&amp;Co !');
});

// Liste des utilisateurs
app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ]);
});

// Ajouter un utilisateur
app.post('/users', (req, res) => {
    const newUser = req.body;
    // Ici, vous ajouteriez l'utilisateur à votre base de données
    res.status(201).json({ message: 'Utilisateur ajouté avec succès !', user: newUser });
});

// Utilisation des routes pour les blagues
app.use('/api/jokes', jokeRoutes);

// Synchronisation de la base de données
sequelize.sync().then(() => {
    console.log('Base de données synchronisée');
    // Lancement du serveur
    app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log('Accueil : http://localhost:' + PORT);
    console.log('Accéder à l API : http://localhost:' + PORT + '/users pour les utilisateurs et http://localhost:' + PORT + '/api/jokes pour les blagues.');
    console.log('Appuyez sur CTRL+C pour arrêter le serveur.');
    });
});


import swaggerJSDoc from "swagger-jsdoc";
import dotenv from 'dotenv';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Récupération de l'URL de base de l'API depuis les variables d'environnement
const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3001/api/";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de blagues pour Carambar&Co",
            version: "1.0.0",
            description: "Cette API permet de gérer et de récupérer des blagues pour l'application Carambar&Co."
        },
        servers: [
            {
                url: apiBaseUrl,
                description: "Serveur de développement"
            }
        ]
    },
    apis: ["./routes/*.js"] // Chemin vers les fichiers contenant les annotations Swagger
};

export const specs = swaggerJSDoc(options);

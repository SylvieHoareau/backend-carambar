import swaggerJSDoc from "swagger-jsdoc";

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
                url: "http://localhost:3000",
                description: "Serveur de développement"
            }
        ]
    },
    apis: ["./routes/*.js"] // Chemin vers les fichiers contenant les annotations Swagger
};

export const specs = swaggerJSDoc(options);

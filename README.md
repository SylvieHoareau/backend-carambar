# API Carambar

Une API REST moderne construite avec **Node.js**, **Express** et **Sequelize** (SQLite)

# Fonctionnalités
- Récupérer toutes les blagues
- Ajouter de nouvelles blagues en base de données
- Rechercher une blague par son ID
- Mettre à jour ou supprimer des blagues existantes
- Documentation interactive avec **Swagger**

# Installation et Démarrage

1. **Cloner le projet**
```bash
git clone 
cd backend-carambar
```
2. Installer les dépendances
```bash
npm install
```
3. Lancer le serveur
```bash
npm run start
```

Le serveur démarrera sur http://localhost:3000

# Documentation de l'API
L'API est entièrement documentée via Swagger. Vous pouvez tester chaque route directement depuis votre navigateur :

**Accéder au Swagger UI :** http://localhost/api-docs

# Liste des Routes principales

| Méthode | Endpoint | Description
| :--- | : --- | :--- |
| **GET** | /api/jokes | Récupérer toutes les blagues
| **GET** | /api/jokes/:id | Récupérer une blague précise
| **POST** | /api/jokes | Ajouter une nouvelle blague
| **PUT** | /api/jokes/:id | Modifier une blague
| **DELETE** | /api/jokes/:id | Supprimer une blague

# Sécurité
L'API intégre plusieurs couches de protection :
- **Helmet** : protection des ne-têtes HTTP
- **CORS** : Gestion des accès cross-origin
- **Express Rate Limit** : Limitation du nombre de requêtes pour éviter des abus.

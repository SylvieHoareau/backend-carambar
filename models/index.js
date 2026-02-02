import { Sequelize } from "sequelize";

// On crée une instance qui pointe vers un fichier local
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

export default sequelize;
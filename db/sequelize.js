import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

//create dbConfig object from env vars
const dbConfig = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST
}

// Create a new instance of the Sequelize class using the database configuration
const sequelize = new Sequelize(
    dbConfig.database, 
    dbConfig.username, 
    dbConfig.password, 
    {
        host: dbConfig.host,
        dialect: 'mysql',
    }
);

// Export the Sequelize instance
export default sequelize;
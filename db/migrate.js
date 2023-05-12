// migrate.js
import Umzug from 'umzug';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import url from 'url';
import path from 'path';

dotenv.config(); // Load environment variables from .env file

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize and configure Umzug
const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize,
  },
  migrations: {
    path: path.resolve(__dirname, 'migrations'),
    params: [sequelize.getQueryInterface(), Sequelize],
  },
});

async function runMigrations() {
  try {
    const pendingMigrations = await umzug.pending();
    if (pendingMigrations.length === 0) {
      console.log('No pending migrations.');
      return;
    }

    await umzug.up();
    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await sequelize.close();
  }
}

runMigrations();

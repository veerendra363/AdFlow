import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

// Load config.json manually
const configPath = path.resolve(__dirname, '../config/config.json');
const rawData = fs.readFileSync(configPath);
const configFile = JSON.parse(rawData);

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const db = {};

// Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Dynamically import all models in this folder (Windows-safe)
const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      !file.includes('.test.js')
  );

for (const file of files) {
  const modelURL = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(modelURL);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Run associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export Sequelize instance and all models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
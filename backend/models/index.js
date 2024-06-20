import fs from 'fs/promises';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import sequelize from '../config/db.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = {};

async function loadModels() {
  try {
    const files = await fs.readdir(__dirname);

    for (const file of files) {
      if (file !== 'index.js' && file.endsWith('.js')) {
        const { default: defineModel } = await import(path.join(__dirname, file));
        const model = defineModel(sequelize, DataTypes);
        db[model.name] = model;
      }
    }

    Object.values(db)
      .filter(model => typeof model.associate === 'function')
      .forEach(model => model.associate(db));

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    console.log('Models loaded successfully');
  } catch (err) {
    console.error('Error loading models:', err);
  }
}

await loadModels();

export default db;
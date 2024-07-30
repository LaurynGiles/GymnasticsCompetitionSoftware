import { readFileSync } from 'fs';
import { Sequelize} from 'sequelize';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = /* @vite-ignore */ fileURLToPath(import.meta.url);
const __dirname = /* @vite-ignore */ path.dirname(__filename);

const config = JSON.parse(readFileSync(__dirname + '/../config/config.json', 'utf-8'));

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
  dialect: config[env].dialect,
  storage: config[env].storage,
  logging: console.log,
});

export default sequelize;
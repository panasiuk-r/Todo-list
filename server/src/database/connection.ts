import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './src/config.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USERNAME || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const checkCon = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Error connecting:', error);
  }
};

export { sequelize, checkCon };
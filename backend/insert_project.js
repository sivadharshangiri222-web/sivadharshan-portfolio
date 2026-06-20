import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

async function run() {
  let connection;
  try {
    console.log('Connecting to database:', dbConfig.host);
    connection = await mysql.createConnection(dbConfig);
    const title = 'DarzFusion AI — Premium Multimodal AI Assistant';
    const [rows] = await connection.query('SELECT id FROM projects WHERE title = ?', [title]);
    if (rows.length > 0) {
      console.log('Project already exists in database.');
    } else {
      console.log('Inserting project...');
      await connection.query(
        `INSERT INTO projects (title, description, technologies, github_link, live_link, image_url) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          title,
          'DarzFusion AI is a state-of-the-art, premium multimodal AI assistant (similar to ChatGPT) that integrates text messaging, real-time image analysis, and voice note interactions into a single, high-performance web application. It features a luxury dark-mode interface, persistent database-backed history, and Google Search Grounding to answer real-time, current-event questions.',
          'Python, FastAPI, SQLite, SQLAlchemy, Gemini 2.5 Flash, TailwindCSS, Docker',
          'https://github.com/sivadharshangiri222-web/Darzfusion-AI',
          'https://darzfusion-ai.onrender.com',
          ''
        ]
      );
      console.log('Project inserted successfully!');
    }
  } catch (error) {
    console.error('Error inserting project:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

run();

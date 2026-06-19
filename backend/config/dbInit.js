import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || ''
};

async function init() {
  let connection;
  try {
    console.log('Connecting to MySQL server...');
    connection = await mysql.createConnection(dbConfig);
    const dbName = process.env.DB_NAME || 'portfolio_db';
    
    console.log(`Creating database "${dbName}" if it does not exist...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.query(`USE \`${dbName}\``);

    console.log('Creating "admins" table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Creating "contacts" table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Creating "projects" table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        technologies VARCHAR(255) NOT NULL,
        github_link VARCHAR(255),
        live_link VARCHAR(255),
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Creating "skills" table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        level INT NOT NULL,
        icon VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Creating "profile" table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        designation VARCHAR(255) NOT NULL,
        cgpa VARCHAR(50) NOT NULL,
        bio TEXT NOT NULL,
        email VARCHAR(255) NOT NULL,
        github VARCHAR(255) NOT NULL,
        linkedin VARCHAR(255) NOT NULL,
        profile_photo VARCHAR(255) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Seed default admin
    const [admins] = await connection.query('SELECT * FROM admins LIMIT 1');
    if (admins.length === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'adminpassword';
      console.log(`Seeding default admin account with username "${username}"...`);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await connection.query(
        'INSERT INTO admins (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );
    }

    // Seed initial projects if empty
    const [projects] = await connection.query('SELECT * FROM projects LIMIT 1');
    if (projects.length === 0) {
      console.log('Seeding initial projects from CV...');
      const initialProjects = [
        {
          title: 'Air Nexus',
          description: 'Developed AIR NEXUS to solve deadlock issues in airline booking systems using Resource Allocation Graph (RAG) algorithms. Enhanced booking reliability by detecting and preventing circular wait conditions.',
          technologies: 'Python, Graph Algorithms, MySQL, Data Structures',
          github_link: 'https://github.com/sivadharshan',
          live_link: '',
          image_url: ''
        },
        {
          title: 'Smart Sense',
          description: 'Developed SMART SENSE to reduce energy wastage in classrooms using IoT-based automation with NodeMCU and Blynk. Automated lighting and fan control using PIR, LDR, and DHT11 sensors for real-time smart classroom management.',
          technologies: 'Python, IoT, NodeMCU, Blynk, MySQL',
          github_link: 'https://github.com/sivadharshan',
          live_link: '',
          image_url: ''
        }
      ];

      for (const p of initialProjects) {
        await connection.query(
          'INSERT INTO projects (title, description, technologies, github_link, live_link, image_url) VALUES (?, ?, ?, ?, ?, ?)',
          [p.title, p.description, p.technologies, p.github_link, p.live_link, p.image_url]
        );
      }
    }

    // Seed initial skills if empty
    const [skills] = await connection.query('SELECT * FROM skills LIMIT 1');
    if (skills.length === 0) {
      console.log('Seeding initial skills from CV...');
      const initialSkills = [
        { name: 'Logical thinking', level: 90, icon: 'FiCpu' },
        { name: 'Software debugging', level: 85, icon: 'FiTerminal' },
        { name: 'Computer programming', level: 88, icon: 'FiCode' },
        { name: 'Problem Solving', level: 92, icon: 'FiCheckCircle' },
        { name: 'Python', level: 80, icon: 'SiPython' },
        { name: 'UI/UX', level: 78, icon: 'MdDesignServices' }
      ];

      for (const s of initialSkills) {
        await connection.query(
          'INSERT INTO skills (name, level, icon) VALUES (?, ?, ?)',
          [s.name, s.level, s.icon]
        );
      }
    }

    // Seed initial profile if empty
    const [profileRows] = await connection.query('SELECT * FROM profile LIMIT 1');
    if (profileRows.length === 0) {
      console.log('Seeding initial profile info...');
      await connection.query(
        'INSERT INTO profile (name, designation, cgpa, bio, email, github, linkedin, profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          'K. Sivadharshan',
          'B.Tech IT Student',
          '8.7',
          'Passionate about building modern web applications, AI solutions and innovative projects.',
          'sivadharshangiri222@gmail.com',
          'https://github.com/sivadharshan',
          'https://www.linkedin.com/in/skdharshan',
          '/src/assets/profile_photo.jpg'
        ]
      );
    }

    console.log('Database initialization successfully completed!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

init();

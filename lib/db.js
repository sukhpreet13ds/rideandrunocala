import mysql from 'mysql2/promise';

const g = globalThis;

function pool() {
  if (!g.__pool) {
    g.__pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      connectTimeout: 10000,
      charset: 'utf8mb4',
      timezone: 'Z',
    });
    g.__pool.pool.on('connection', (c) => c.query("SET time_zone = '+00:00'"));
  }
  return g.__pool;
}

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS content (
    k VARCHAR(190) PRIMARY KEY,
    value MEDIUMTEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS settings (
    k VARCHAR(100) PRIMARY KEY,
    value JSON NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mime VARCHAR(100) NOT NULL,
    data MEDIUMBLOB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entry_type VARCHAR(40) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(80) NULL,
    survivor TINYINT(1) NOT NULL DEFAULT 0,
    tickets JSON NOT NULL,
    amount_cents INT NOT NULL,
    form_data JSON NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    stripe_payment_intent VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP NULL,
    INDEX (status), INDEX (entry_type), INDEX (stripe_payment_intent)
  )`,
  `CREATE TABLE IF NOT EXISTS donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(80) NULL,
    message TEXT NULL,
    anonymous TINYINT(1) NOT NULL DEFAULT 0,
    amount_cents INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    stripe_payment_intent VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP NULL,
    INDEX (status), INDEX (stripe_payment_intent)
  )`,
  `CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
];

export async function ensureSchema() {
  if (!g.__schemaReady) {
    g.__schemaReady = (async () => {
      for (const sql of SCHEMA) await pool().query(sql);
    })().catch((e) => {
      g.__schemaReady = null;
      throw e;
    });
  }
  return g.__schemaReady;
}

export async function query(sql, params = []) {
  await ensureSchema();
  const [rows] = await pool().query(sql, params);
  return rows;
}

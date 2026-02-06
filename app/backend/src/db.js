//obsługa bazy danych
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config() 

const dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(dirname, '../database', process.env.DB_NAME)

const db = new Database(dbPath)

//users
db.prepare(`
    CREATE TABLE IF NOT EXIST users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT CHECK(role IN ('admin', 'user')) NOT NULL DEFAULT 'user',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    `).run();

//categories
db.prepare(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT
    )
  `).run();

//equipment
db.prepare(`
    CREATE TABLE IF NOT EXISTS equipment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      status TEXT CHECK(status IN ('available', 'rented', 'maintenance')) 
        NOT NULL DEFAULT 'available',
      image_url TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

//rentals
db.prepare(`
    CREATE TABLE IF NOT EXISTS rentals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      equipment_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      rented_at TEXT DEFAULT CURRENT_TIMESTAMP,
      return_date TEXT,
      returned_at TEXT,
      status TEXT CHECK(status IN ('active', 'completed', 'overdue')) 
        NOT NULL DEFAULT 'active',
  
      FOREIGN KEY (equipment_id) REFERENCES equipment(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `).run();

export default db
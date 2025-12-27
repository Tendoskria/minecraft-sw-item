require('dotenv').config();
const pool = require('../config/database');

const createTables = async () => {
  console.log('Starting database migration...');
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Create EVENT table
    await client.query(`
      CREATE TABLE IF NOT EXISTS event (
        id SERIAL PRIMARY KEY,
        event_name TEXT NOT NULL,
        symbol TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(event_name)
      )
    `);
    
    // Create ITEM_VANILLA table
    await client.query(`
      CREATE TABLE IF NOT EXISTS item_vanilla (
        id SERIAL PRIMARY KEY,
        item_name TEXT NOT NULL UNIQUE,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(item_name)
      )
    `);
    
    // Create ITEM table
    await client.query(`
      CREATE TABLE IF NOT EXISTS item (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        id_event INTEGER REFERENCES event(id) ON DELETE CASCADE,
        year TEXT NOT NULL,
        id_item_vanilla INTEGER REFERENCES item_vanilla(id),
        category TEXT DEFAULT 'Autres',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(name, id_event, year)
      )
    `);
    
    // Create ENCHANTMENT table
    await client.query(`
      CREATE TABLE IF NOT EXISTS enchantment (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(name)
      )
    `);
    
    // Create ITEM_ENCHANTMENT table
    await client.query(`
      CREATE TABLE IF NOT EXISTS item_enchantment (
        id_item INTEGER REFERENCES item(id) ON DELETE CASCADE,
        id_enchantment INTEGER REFERENCES enchantment(id) ON DELETE CASCADE,
        level INTEGER,
        PRIMARY KEY (id_item, id_enchantment),
        UNIQUE(id_item, id_enchantment)
      )
    `);
    
    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_event_name ON event(event_name)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_item_name ON item(name)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_enchantment_name ON enchantment(name)');
    
    await client.query('COMMIT');
    console.log('Tables created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration error:', error);
    throw error;
  } finally {
    client.release();
  }
};

createTables()
  .then(() => {
    console.log('Migration completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
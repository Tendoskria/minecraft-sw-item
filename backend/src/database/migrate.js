require('dotenv').config();
const pool = require('../config/database');

const createTables = async () => {
  console.log('Starting database migration...');
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Create NOM_EVENT table
    await client.query(`
      CREATE TABLE IF NOT EXISTS nom_event (
        id SERIAL PRIMARY KEY,
        nom TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create EVENT table
    await client.query(`
      CREATE TABLE IF NOT EXISTS event (
        id SERIAL PRIMARY KEY,
        id_nom_event INTEGER REFERENCES nom_event(id) ON DELETE CASCADE,
        annee TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(id_nom_event, annee)
      )
    `);
    
    // Create ITEM_VANILLA table
    await client.query(`
      CREATE TABLE IF NOT EXISTS item_vanilla (
        id SERIAL PRIMARY KEY,
        nom_item TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create ITEM table
    await client.query(`
      CREATE TABLE IF NOT EXISTS item (
        id SERIAL PRIMARY KEY,
        nom TEXT NOT NULL,
        id_event INTEGER REFERENCES event(id) ON DELETE CASCADE,
        id_item_vanilla INTEGER REFERENCES item_vanilla(id),
        category TEXT DEFAULT 'Autres',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create ENCHANTMENT table
    await client.query(`
      CREATE TABLE IF NOT EXISTS enchantment (
        id SERIAL PRIMARY KEY,
        nom TEXT NOT NULL UNIQUE,
        level INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create ITEM_ENCHANTMENT table
    await client.query(`
      CREATE TABLE IF NOT EXISTS item_enchantment (
        id_item INTEGER REFERENCES item(id) ON DELETE CASCADE,
        id_enchantment INTEGER REFERENCES enchantment(id) ON DELETE CASCADE,
        PRIMARY KEY (id_item, id_enchantment)
      )
    `);
    
    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_event_annee ON event(annee)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_item_nom ON item(nom)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_enchantment_nom ON enchantment(nom)');
    
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
require('dotenv').config();
const pool = require('../config/database');

const vanillaItems = [
  // Outils
  'diamond_sword', 'diamond_pickaxe', 'diamond_axe', 'diamond_shovel', 'diamond_hoe',
  'iron_sword', 'iron_pickaxe', 'iron_axe', 'iron_shovel', 'iron_hoe',
  'golden_sword', 'golden_pickaxe', 'golden_axe', 'golden_shovel', 'golden_hoe',
  'netherite_sword', 'netherite_pickaxe', 'netherite_axe', 'netherite_shovel', 'netherite_hoe',
  'wooden_sword', 'wooden_pickaxe', 'wooden_axe', 'wooden_shovel', 'wooden_hoe',
  'stone_sword', 'stone_pickaxe', 'stone_axe', 'stone_shovel', 'stone_hoe',
  
  // Armures
  'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots',
  'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots',
  'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots',
  'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots',
  'leather_helmet', 'leather_chestplate', 'leather_leggings', 'leather_boots',
  'chainmail_helmet', 'chainmail_chestplate', 'chainmail_leggings', 'chainmail_boots',
  'turtle_helmet',
  
  // Armes et combat
  'bow', 'crossbow', 'trident', 'shield',
  
  // Blocs communs
  'stone', 'cobblestone', 'dirt', 'grass_block', 'sand', 'gravel',
  'oak_log', 'birch_log', 'spruce_log', 'jungle_log', 'acacia_log', 'dark_oak_log',
  'oak_planks', 'birch_planks', 'spruce_planks', 'jungle_planks', 'acacia_planks', 'dark_oak_planks',
  
  // Minerais
  'coal_ore', 'iron_ore', 'gold_ore', 'diamond_ore', 'emerald_ore', 'lapis_ore', 'redstone_ore',
  'deepslate_coal_ore', 'deepslate_iron_ore', 'deepslate_gold_ore', 'deepslate_diamond_ore',
  'nether_gold_ore', 'nether_quartz_ore', 'ancient_debris',
  
  // Lingots et gemmes
  'iron_ingot', 'gold_ingot', 'diamond', 'emerald', 'netherite_ingot',
  'coal', 'lapis_lazuli', 'redstone', 'quartz',
  
  // Nourriture
  'apple', 'golden_apple', 'enchanted_golden_apple',
  'bread', 'cooked_beef', 'cooked_porkchop', 'cooked_chicken', 'cooked_mutton',
  'carrot', 'potato', 'baked_potato', 'golden_carrot',
  'melon_slice', 'pumpkin_pie', 'cookie',
  
  // Potions et effet
  'potion', 'splash_potion', 'lingering_potion',
  'experience_bottle', 'totem_of_undying',
  
  // Objets spéciaux
  'elytra', 'saddle', 'name_tag', 'lead',
  'music_disc_13', 'music_disc_cat', 'music_disc_blocks',
  
  // Redstone
  'redstone_torch', 'lever', 'stone_button', 'oak_button',
  'redstone_lamp', 'piston', 'sticky_piston', 'dispenser', 'dropper',
  'hopper', 'observer', 'comparator', 'repeater',
  
  // Decoration
  'torch', 'lantern', 'soul_lantern',
  'oak_sign', 'painting', 'item_frame', 'flower_pot',
  'beacon', 'end_crystal',
  
  // Autres
  'book', 'enchanted_book', 'writable_book', 'written_book',
  'ender_pearl', 'ender_eye', 'blaze_rod', 'ghast_tear',
  'nether_star', 'dragon_egg', 'dragon_head'
];

const seedVanillaItems = async () => {
  console.log('Starting to seed vanilla items...');
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    let inserted = 0;
    let skipped = 0;
    
    for (const itemName of vanillaItems) {
      try {
        await client.query(
          'INSERT INTO item_vanilla (item_name) VALUES ($1) ON CONFLICT (item_name) DO NOTHING',
          [itemName]
        );
        inserted++;
      } catch (err) {
        console.error(`Error inserting ${itemName}:`, err.message);
        skipped++;
      }
    }
    
    await client.query('COMMIT');
    console.log(`✅ Seeding completed!`);
    console.log(`   - Inserted: ${inserted} items`);
    console.log(`   - Skipped: ${skipped} items (already exist)`);
    console.log(`   - Total: ${vanillaItems.length} items processed`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding error:', error);
    throw error;
  } finally {
    client.release();
  }
};

seedVanillaItems()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed:', err);
    process.exit(1);
  });
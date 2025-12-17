const sequelize = require("../db");

/**
 * Fix PostgreSQL sequence for a table after manual inserts or migrations
 * This resolves the "duplicate key value violates unique constraint" error
 * @param {string} tableName - Name of the table
 * @param {string} sequenceName - Name of the sequence (usually tableName_id_seq)
 */
const fixSequence = async (tableName, sequenceName = null) => {
  try {
    const seqName = sequenceName || `${tableName}_id_seq`;
    
    const query = `
      SELECT setval('${seqName}', COALESCE((SELECT MAX(id) FROM ${tableName}), 1), true);
    `;
    
    await sequelize.query(query);
    console.log(`✓ Sequence ${seqName} fixed for table ${tableName}`);
    return true;
  } catch (error) {
    console.error(`✗ Error fixing sequence for ${tableName}:`, error.message);
    return false;
  }
};

/**
 * Fix all sequences at once
 */
const fixAllSequences = async () => {
  console.log('Fixing all database sequences...');
  
  await fixSequence('states');
  await fixSequence('cities');
  await fixSequence('subscription_types');
  await fixSequence('tenants');
  await fixSequence('users');
  await fixSequence('subscriptions');
  await fixSequence('password_resets');
  await fixSequence('settings');
  await fixSequence('hero_section');
  
  console.log('All sequences fixed!');
};

module.exports = {
  fixSequence,
  fixAllSequences
};

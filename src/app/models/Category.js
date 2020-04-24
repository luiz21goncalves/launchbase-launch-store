const db = require('../../config/db');

module.exports = {
  all() {
    try {
      return db.query(`
        SELECT * FROM categories
      `);
    } catch (err) {
      console.error('Category all', err);
    }
  }
}

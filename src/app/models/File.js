const Base = require('./Base');

Base.init({ table: 'files' });

const File = { ...Base };

module.exports = { File };

//   async delete(id) {
//     try {
//       const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
//       const file = result.rows[0];
  
//       fs.unlinkSync(file.path);

//       return db.query(`
//         DELETE FROM files WHERE id = $1
//       `, [id]);
//     } catch {
//       console.error('File delete', err);
//     }
//   }
// }
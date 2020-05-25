const Base = require('./Base');

Base.init({ table: 'users' });

const User = {
  ...Base,
};

module.exports = { User };

  // async create(data) {
  //   const query = `
  //     INSERT INTO users (
  //       name,
  //       email,
  //       password,
  //       cpf_cnpj,
  //       cep,
  //       address
  //     ) VALUES ($1, $2, $3, $4, $5, $6)
  //     RETURNING id
  //   `;

  //   const passwordHash = await hash(data.password, 8);

  //   const values = [
  //     data.name,
  //     data.email,
  //     passwordHash,
  //     data.cpf_cnpj.replace(/\D/g, ''),
  //     data.cep.replace(/\D/g, ''),
  //     data.address,
  //   ]

  //   const results = await db.query(query, values);

  //   return results.rows[0].id;
  // },

  

  // async delete(id) {
  //   let results = await db.query('SELECT * FROM products WHERE user_id = $1', [id]);
  //   const products = results.rows;

  //   const allFilesPromise = products.map(product => Product.files(product.id));

  //   let promiseResults = await Promise.all(allFilesPromise);

  //   await db.query('DELETE FROM users WHERE id = $1', [id]);

  //   promiseResults.map(result => result.rows.map(file => fs.unlinkSync(file.path)));
  // }

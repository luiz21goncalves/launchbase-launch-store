const { formatPrice } = require('../../lib/utils');

const Product = require('../models/Product');
const File = require('../models/File');

module.exports = {
  async index(req, res) {
    try {
      let results,
        params = {};

      const { filter, category } = req.query;

      if (!filter)
        return res.redirect('/');

      params.filter = filter;

      if (category)
        params.category = category;

      results = await Product.search(params);

      const productsPromise = results.rows.map(async product => {
        product.img = await getImage(product.id);
        product.price = formatPrice(product.price);
        product.oldPrice = formatPrice(product.old_price);
        return product;
      });

      const products = await Promise.all(productsPromise);

      const search = {
        term: req.query.filter,
        total: products.length,
      };

      

    } catch (err) {
      throw new Error(err);
    }

    return res.render('search/index.njk', { products: lastAdded });
  }
};

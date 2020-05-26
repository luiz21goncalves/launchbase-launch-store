const { unlinkSync } = require('fs');

const Category = require('../models/Category');
const Product = require('../models/Product');
const File = require('../models/File');
const LoadProductService = require('../services/LoadProductService');

module.exports = {
  async create(req, res) {
    try {
      const categories = await Category.findAll();
  
      return res.render('products/create', { categories });
    } catch (err) {
      console.error(err);

      return res.render('products/create', { 
        categories,
        error: 'Erro inesperado, tente novamente!'
      });
    }
  },

  async post(req, res) {
    try {
      let {
        category_id,
        name,
        description,
        old_price,
        price,
        quantity,
        status
      } = req.body;

      price = price.replace(/\D/g, '');

      const product_id = await Product.create({
        category_id,
        user_id: req.session.userId,
        name,
        description,
        old_price: old_price || price,
        price,
        quantity,
        status: status || 1,
      });

      const filesPromise = req.files.map(file => File.create({
        name: file.filename,
        path: file.path,
        product_id
      }));
      await Promise.all(filesPromise);

      return res.redirect(`/products/${product_id}/edit`);
    } catch (err) {
      console.error('ProductController post', err);

      return res.render('products/create', {
        product: req.body,
        error: 'Erro inesperado, tente novamente!'
      });
    }
  },

  async show(req, res) {
    try {
      const product = await LoadProductService.load('product', {
        where: { id: req.params.id } 
      });
  
      return res.render('products/show', { product });
    } catch (err) {
      console.error('ProductController show', err);

      return res.render('home/index', {
        error: 'Erro inesperado, tente novamente!'
      })
    }
  },

  async edit(req, res) {
    try {
      const product = await LoadProductService.load('product', {
        where: { id: req.params.id } 
      });
  
      const categories = await Category.findAll();

      return res.render('products/edit', { product, categories });
    } catch (err) {
      console.error('ProductController edit', err);

      return res.render('home/index', {
        error: 'Erro inesperado, tente novamente!'
      });
    }
  },

  async put(req, res) {
    try {
      if (req.files != 0) {
        const newFilesPromese = req.files.map(file => File.create({...file, product_id: req.body.id}));
  
        await Promise.all(newFilesPromese);
      }
      
      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(",");
        const lastIndex = removedFiles.length - 1;                                              
        removedFiles.splice(lastIndex, 1);
        
        const removedFilesPromise = removedFiles.map(id => File.delete(id));
        await Promise.all(removedFilesPromise);
      }
      
      req.body.price = req.body.price.replace(/\D/g, "");
  
      if(req.body.old_price != req.body.price) {
        const { price } = await Product.find(req.body.id);
  
        req.body.old_price = price;
      }

      const {
        category_id,
        name,
        description,
        old_price,
        price,
        quantity,
        status,
      } = req.body;
  
      await Product.update(req.body.id, {
        category_id,
        name,
        description,
        old_price,
        price,
        quantity,
        status,
      });
  
      return res.redirect(`/products/${req.body.id}`);
    } catch (err) {
      console.error('ProductController put', err);

      return res.render('products/edit', {
        product: req.body,
        error: 'Erro inesperado, tente novamente!'
      });
    }
  },

  async delete(req, res) {
    try {
      const files = await Product.files(req.body.id);
      
      await Product.delete(req.body.id);
      
      files.map(file => unlinkSync(file.path));

      return res.redirect('products/create');
    } catch (err) {
      console.error('ProductController delete', err);

      return res.render('products/edit', {
        product: req.body,
        error: 'Erro inesperado, tente novamente!'
      });
    }
  }
}

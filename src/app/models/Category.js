const Base = require('./Base');

Base.init({ table: 'categorires' });

const Category = { ...Base };

module.exports = Category;

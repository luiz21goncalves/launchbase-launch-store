const { hash } = require('bcryptjs');
const faker = require('faker');
const fs = require('fs')

const User = require('./src/app/models/User');
const Product = require('./src/app/models/Product');
const File = require('./src/app/models/File');

let usersIds = [];
let productsIds = [];
let totalUsers = 3;
let totalProducts = 10;

async function createUsers() {
  const users = [];
  const password = await hash('123456', 8);

  while (users.length < totalUsers) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password,
      cpf_cnpj: faker.random.number(99999999999),
      cep: faker.random.number(99999999),
      address: faker.address.streetName(),
    });
  }

  const usersPromise = users.map(user => User.create(user));
  usersIds = await Promise.all(usersPromise)
};

async function createProducts() {
  let products = [];

  while (products.length < totalProducts) {
    products.push({
      category_id: Math.ceil(Math.random() * 3),
      user_id: usersIds[Math.floor(Math.random() * totalUsers)],
      name: faker.name.title(),
      description: faker.lorem.paragraph(Math.ceil(Math.random() * 4)),
      old_price: faker.random.number(9999),
      price: faker.random.number(9999),
      quantity: faker.random.number(99),
      status: Math.round(Math.random()),
    });
  }

  const productsPromise = products.map(product => Product.create(product));
  productsIds = await Promise.all(productsPromise);

  let files = [];

  function copy() {
    const pathIn = fs.createReadStream('public/placeholder.png');
    const pathOut = fs.createWriteStream(`public/images/${faker.random.number()}-placeholder.png`);
  
    const file = pathIn.pipe(pathOut);
    return file.path;
  };
  
  while (files.length < 50) {
    files.push({
      name: faker.image.image(),
      path: copy(),
      product_id: productsIds[Math.floor(Math.random() * totalProducts)],
    });
  }

  const filesPromise = files.map(file => File.create(file));
  await Promise.all(filesPromise);
};

async function init() {
  await createUsers();
  await createProducts();
};

init();

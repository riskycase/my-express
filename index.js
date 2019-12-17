// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();

//import package.json
const pack = require('./package');

//import categories.json
const all_categories = require('./src/data/categories.json').categories;

//import products.json
const all_products = require('./src/data/products').products;

// server configuration
const PORT = 8080;

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});

function construct_master(){
	var master_products = all_products;
	master_products.forEach(
		(product) => product.categoryName = all_categories.filter(
		// check if id of category element matches product categoryId
			each_category => each_category.id === product.categoryId)[0].categoryName);
	return master_products;
}

function get_product_by_category(ctyId){ 
    var category_products =  product_master.filter(
    //filter out product which have specific categoryId
    product => product.categoryId === ctyId);
    return(category_products);
}

var product_master = construct_master();

// endpoint to get all products
app.get('/products/all', (req, res) => {
  res.json(product_master);
});

// endpoint to get details of specific product
app.get('/product/:id', (req, res) => {
  var requested_product = product_master.find(
    //filter out product which have specific id
    product => product.id === req.params.id);
  res.json(requested_product);
});

// endpoint to get details of specific category
app.get('/category/:ctyId', (req, res) => {
  res.json(get_product_by_category(req.params.ctyId));
});

//endpoint info to return a json
app.get('/info', (req, res) => {
  res.json({ serverName:pack.name, serverVersion:pack.version });
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

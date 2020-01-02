// import express (after npm install express)
const express = require('express')

// create new express app and save it as "app"
const app = express()

// import package.json
const packageInfo = require('./package')

// import dataService.js
const dataService = require('./dataService.js')

// server configuration
const PORT = 8080

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World')
})

/*
 * Filter out products of specific category
 */
function getProductsByCategory (ctyId) {
  // Convert the map to an Array, filter out required products and
  // create object from the filtered array
  return Object.fromEntries(
    Array.from(dataService.getCombinedProductMap()).filter(
      ([id, product]) => product.categoryId === ctyId
    )
  )
}

// endpoint to get all products
app.get('/products/all', (req, res) => {
  res.json(Object.fromEntries(dataService.getCombinedProductMap()))
})

// endpoint to get details of specific product
app.get('/product/:id', (req, res) => {
  res.json(
    Object.fromEntries(dataService.getCombinedProductMap())[req.params.id]
  )
})

// endpoint to get details of specific category
app.get('/category/:ctyId', (req, res) => {
  res.json(getProductsByCategory(req.params.ctyId))
})

// endpoint info to return a json
app.get('/info', (req, res) => {
  res.json({ serverName: packageInfo.name, serverVersion: packageInfo.version })
})

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`)
})

let categoryMap = null
let productMap = null
let combinedProductMap = null

/*
 * Map individual product objects to product id attributes
 */
function getProducts () {
  if (!productMap || !productMap.size) {
    const allProducts = require('./src/data/products.json').products
    productMap = new Map(allProducts.map(product => [product.id, product]))
  }
}

/*
 * Map categoryName as a value for attribute for categoryId
 */
function getCategories () {
  if (!categoryMap || !categoryMap.size) {
    const allCategories = require('./src/data/categories.json').categories
    categoryMap = new Map(
      allCategories.map(category => [category.id, category.categoryName])
    )
  }
}

/*
 * Iterate over productMap and assign categoryName to all
 */
function combineProductsWithCategories () {
  // call the above defined functions
  getProducts()
  getCategories()
  combinedProductMap = new Map(
    Array.from(productMap).map(([id, product]) => {
      product.categoryName = categoryMap.get(product.categoryId)
      delete product.id
      return [id, product]
    })
  )
}

/*
 * Check if combinedProductMap is null and call combineProductsWithCategories
 */
const getCombinedProductMap = () => {
  if (!combinedProductMap || !combinedProductMap.size) {
    combineProductsWithCategories()
  }
  return combinedProductMap
}

module.exports.getCombinedProductMap = getCombinedProductMap

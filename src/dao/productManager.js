import { compareKeys } from '../auxiliary functions/compareKeys.js'
import fs from 'fs'

//*************************************************** Product Class ***************************************************
class Product {
  constructor( title, description, price, thumbnail, code, stock, status, category, ) {
    this.title = title || ''
    this.description = description || ''
    this.price = price || 0
    this.thumbnail = thumbnail || ''
    this.code = code || 0
    this.stock = stock || 0
    this.status = status || true
    this.category = category || ''
  }
}

//*************************************************** Product Manager ***************************************************
class ProductManager {
  constructor(path) {
    this.path = path
    this.readProducts()
    this.errorMessage = null
  }

  async readProducts() {
  }

  addProductRawObject(rawObjectProduct) {
    const { title, description, price, thumbnail, code, stock, status, category } = rawObjectProduct
  }

  addProductRaw( title, description, price, thumbnail, code, stock, status, category, ) {
  }

  addProduct(product) {
  }

  getProducts() {
  }

  getProductById(id) {
  }

  updateProduct(id, overrideObject) {
  }

  deleteProduct(id) {
  }
}

//*************************************************** Exports ***************************************************
export { ProductManager }

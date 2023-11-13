import {compareKeys} from "./auxiliary functions/compareKeys.js"
import fs from "fs"

//*************************************************** Product Class ***************************************************
class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title || ''
    this.description = description || ''
    this.price = price || 0
    this.thumbnail = thumbnail || ''
    this.code = code || 0
    this.stock = stock || 0
  }
}

//*************************************************** Product Manager ***************************************************
class ProductManager {
  constructor(path) {
    this.path = path
    this.readProducts()
  }

  async readProducts() {
    await fs.readFile(this.path, 'utf-8', (err, data) => {
      if (err) throw err
      this.products = JSON.parse(data)
    })
  }

  addProductRaw(title, description, price, thumbnail, code, stock) {
    const product = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    )
    this.addProduct(product)
  }

  addProduct(product) {
    const codeArray = this.products.map((product) => product.code)
    if (codeArray.includes(product.code)) {
      console.error('This code is already taken!')
    } else {
      const productNumber = this.products.length
      let selfIncrementingId
      !productNumber
        ? (selfIncrementingId = 0)
        : (selfIncrementingId = this.products[productNumber - 1].id + 1)

      const newProduct = { ...product, id: selfIncrementingId }
      this.products.push(newProduct)
      this.updateFile()
    }
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    const foundProduct = this.products.find((element) => element.id === id)
    if (foundProduct) {
      //console.log(`Product with an id of ${id}`, foundProduct)
      return foundProduct
    } else {
      console.error(`Product with an id of ${id} not found`)
      return {error: `Product with an id of ${id} not found`}
    }
  }

  updateProduct(id, overrideObject) {
    if (!overrideObject.hasOwnProperty('id')) {
      const updatedProduct = { ...this.getProductById(id), ...overrideObject }
      if (compareKeys(updatedProduct, this.getProductById(id))) {
        this.products[id] = updatedProduct
        this.updateFile()
      } else {
        error('Wrong keys')
      }
    } else {
      error('Id of the object cannot be updated')
    }
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id)
    this.updateFile()
  }

  updateFile() {
    fs.writeFile(this.path, JSON.stringify(this.products))
  }
}

//*************************************************** Exports ***************************************************
export {ProductManager}
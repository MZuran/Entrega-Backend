import fs from 'fs'

class Cart {
  constructor(carts) {
    this.carts = carts || []
  }
}

class CartsManager {
  constructor(path) {
    this.path = path
    this.carts = []
    this.readCarts()
    this.errorMessage = null
  }

  async readCarts() {
    await fs.readFile(this.path, 'utf-8', (err, data) => {
      if (err) throw err
      this.carts = JSON.parse(data)
    })
  }

  createCart() {
    const cartsNumber = this.carts.length
    let selfIncrementingId
    !cartsNumber
      ? (selfIncrementingId = 0)
      : (selfIncrementingId = this.carts[cartsNumber - 1].id + 1)

    const newCart = { products: [], id: selfIncrementingId }
    this.carts.push(newCart)
    this.updateFile()
  }

  updateFile() {
    fs.writeFile(this.path, JSON.stringify(this.carts), (err) => {
      if (err) {
        console.error(err)
        this.errorMessage = err
      }
    })
  }

  getCartById(id) {
    const foundCart = this.carts.find((element) => element.id === id)
    if (foundCart) {
      //console.log(`Product with an id of ${id}`, foundCart)
      return foundCart
    } else {
      console.error(`Cart with an id of ${id} not found`)
      return { error: `Cart with an id of ${id} not found` }
    }
  }

  addProductToCart(cid, pid) {
    const cart = this.getCartById(cid)
    console.log(cart.products)
    const foundProductInCart = cart.products.find(
      (element) => element.product === pid,
    )

    if (!foundProductInCart) {
      this.carts.find((element) => {
        if (element.id === cid) {
          element.products.push({ product: pid, quantity: 1 })
        }
      })
    } else {
      this.carts.find((element) => {
        if (element.id === cid) {
          console.log(element)
          element.products.find((subElement) => {
            if (subElement.product === pid) {
              subElement.quantity += 1
            }
          })
        }
      })
    }

    this.updateFile()
  }
}

export { CartsManager }

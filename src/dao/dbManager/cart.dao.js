import { cartModel } from "../models/cart.model.js"

class cartDao {
    constructor() { this.model = cartModel }

    async getAllCarts(limitNumber) {
        //Handlebars NO FUNCIONA con los objetos de mongoose
        //Poner .lean() es para que esté en un formato que sí los pueda usar
        if (limitNumber) {
            return await this.model.find().limit(limitNumber).lean()
        } else {
            return await this.model.find().lean()
        }
    }

    async getCartById(id) {
        return await this.model.findById(id)
    }

    async createCart(cart) {
        return await this.model.create(cart)
    }

    async addItemToCart(cartId, itemId) {
        return await this.model.findAndModify()
    }

    async updateCart(id, cart) {
        return await this.model.findByIdAndUpdate(id, cart)
    }

    async deleteCart(id) {
        return await this.model.findByIdAndDelete(id)
    }

    async aggregateTest() {
        return await this.model.aggregate([
            {$match: {"contents.amount": 10}},
            {$lookup: {
                from: "contents.product",
                localField: "title",
                foreignField: "contents.product._id",
                as: "product",
            }}
        ])
    }
}

export default cartDao
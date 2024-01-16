import { cartModel } from "../models/cart.model.js"
import mongoose from "mongoose"

import { stringToObjectId } from "../../auxiliary functions/parseStringToObjectId.js"

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

    async findProductInCart(cartId, productId) {
        const cid = stringToObjectId(cartId)
        const pid = stringToObjectId(productId)

        return await this.model.aggregate([
            {$match: {"_id": cid}},
            {$project: { _id: 0, __v: 0 }},
            {$unwind: "$contents"},
            {$match: {"contents.product": pid}},
            {$project: {
                "product": "$contents.product",
                "amount": "$contents.amount"
            }}
        ])
    }
    
    async deleteProduct(cartId, productId) {
        const cid = stringToObjectId(cartId)
        const pid = stringToObjectId(productId)

        return await this.model.aggregate([
            {$match: {"_id": cid}},
            {$project: { _id: 0, __v: 0 }},
            {$unwind: "$contents"},
            {$match: {"contents.product": pid}},
        ])
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
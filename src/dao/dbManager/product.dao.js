import { productModel } from "../models/product.model.js"

class productDao {
    constructor() { this.model = productModel }

    async getAllProducts(queryObject) {
        const {limit, page, sort, query} = queryObject

        //return await this.model.find().limit(limit).lean()
        //Example of a req using all of these params:
        //http://localhost:8080/api/products/?limit=2&page=1&sort=desc&query={"price":{"$lte":5}}
        return await this.model.paginate(query,{limit: limit, page: page, sort: sort})
    }

    async getProductById(id) {
        return await this.model.findById(id).lean()
    }

    async createProduct(product) {
        return await this.model.create(product)
    }

    async updateProduct(id, product) {
        return await this.model.findByIdAndUpdate(id, product)
    }

    async deleteProduct(id) {
        return await this.model.findByIdAndDelete(id)
    }
}

export default productDao
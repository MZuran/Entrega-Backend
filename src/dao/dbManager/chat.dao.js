import { messageModel } from "../models/message.model.js"

class chatDao {
    constructor() { this.model = messageModel }

    async getAllMessages(limitNumber) {
        //Handlebars NO FUNCIONA con los objetos de mongoose
        //Poner .lean() es para que esté en un formato que sí los pueda usar
        if (limitNumber) {
            return await this.model.find().limit(limitNumber).lean()
        } else {
            return await this.model.find().lean()
        }
    }

    async getMessageById(id) {
        return await this.model.findById(id)
    }

    async createMessage(cart) {
        return await this.model.create(cart)
    }

    async updateMessage(id, msg) {
        return await this.model.findByIdAndUpdate(id, msg)
    }

    async deleteMessage(id) {
        return await this.model.findByIdAndDelete(id)
    }
}

export default chatDao
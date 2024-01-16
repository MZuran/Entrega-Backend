import mongoose from "mongoose";

export function stringToObjectId(string) {
    var id = new mongoose.Types.ObjectId(string)
    return id
}

//Used in aggregation $match expressions
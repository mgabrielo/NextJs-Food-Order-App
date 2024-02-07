import { Schema, model, models } from "mongoose";

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const MenuItem = models?.MenuItem || model('MenuItem', menuItemSchema)

export default MenuItem
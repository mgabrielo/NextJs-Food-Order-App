import { model, models, Schema } from "mongoose";

const catgeorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
const Category = models?.Category || model('Category', catgeorySchema)
export default Category;
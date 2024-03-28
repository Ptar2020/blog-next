import { models, model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Category = models.Category || model("Category", categorySchema);

export default Category;

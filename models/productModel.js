import mongoose from "mongoose";
import slugify from "slugify";
import mongooseAutoPopulate from "mongoose-autopopulate";
const productModelSchema = new mongoose.Schema(
  {
    arabicName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    serialNumber: {
      type: String,
      required: false,
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    details: [
      {
        color: {
          type: String,
          required: false,
        },
        sizes: [
          {
            size: {
              type: String,
              required: false,
            }
          },
        ],
      },
    ],
    subCategoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategorySchema",
      required: false,
      autopopulate: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategorySchema",
      required: true,
      autopopulate: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

productModelSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productModelSchema.plugin(mongooseAutoPopulate);
const ProductSchema = mongoose.model("ProductSchema", productModelSchema);

export default ProductSchema;

// [{"color":"red", "sizes":[{"size":"small", "quantity":9},{"size":"medium", "quantity":20}]},{"color":"blue", "sizes":[{"size":"small", "quantity":9}]},{"color":"brown", "sizes":[{"size":"large", "quantity":10},{"size":"medium", "quantity":20}]},{"color":"brown", "sizes":[{"size":"large", "quantity":10},{"size":"medium", "quantity":20}]}]
// [{"color":"red", "sizes":[{"size":"small"},{"size":"medium"}]},{"color":"blue", "sizes":[{"size":"testsmall"}]},{"color":"brown", "sizes":[{"size":"large"},{"size":"medium"}]}]

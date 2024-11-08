const mongoose = require("mongoose");

const ItemsSchema = mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
      },
      instock: {
        type: Boolean,
        required: true, 
        default: false
        
      },
  },

  { timestamps: true }
);

const Items = mongoose.model("Items", ItemsSchema);

module.exports = Items;
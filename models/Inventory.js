const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  vendor: { type: String },
  status: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    default: "In Stock",
  },
});

module.exports = mongoose.model("Inventory", InventorySchema);

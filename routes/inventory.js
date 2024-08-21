const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const auth = require("../middleware/auth");

// Get all inventory items
router.get("/", auth, async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new inventory item
router.post("/", auth, async (req, res) => {
  const { name, quantity, location, vendor, status } = req.body;
  const inventory = new Inventory({ name, quantity, location, vendor, status });

  try {
    const newInventory = await inventory.save();
    res.status(201).json(newInventory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update inventory item
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedInventory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete inventory item
router.delete("/:id", auth, async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Inventory item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

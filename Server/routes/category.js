const express = require("express");
const router = express.Router();

// Assuming you have a Category model and a validation function named validateCategory
const { Category, validate } = require("../models/category");

const authenticateToken = require('./authMiddleware');
router.post("/addCategory", authenticateToken, async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Create a new category
    const category = new Category({
      categoryName: req.body.categoryName,
      description: req.body.description,
      status: req.body.status
    });

    // Save the category to the database
    await category.save();

    // Respond with success message
    res.status(201).send({ message: "Category added successfully", data: category });
  } catch (error) {
    // Handle errors
    console.error("Error adding category:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.get("/categories",  async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find();
    
    // Respond with the categories data
    res.status(200).send({ data: categories });
  } catch (error) {
    // Handle errors
    console.error("Error fetching categories:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.get("/getCategoryById/:id", authenticateToken, async (req, res) => {
  try {
    // Find the category by ID
    const category = await Category.findById(req.params.id);

    // If category not found, return 404
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    // Respond with category data
    res.status(200).send({ data: category });
  } catch (error) {
    // Handle errors
    console.error("Error fetching category:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.put("/updateCategoryById/:id", authenticateToken, async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Find the category by ID
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    // Update category properties
    category.categoryName = req.body.categoryName;
    category.description = req.body.description;
    category.status = req.body.status;

    // Save the updated category
    await category.save();

    // Respond with success message
    res.status(200).send({ message: "Category updated successfully", data: category });
  } catch (error) {
    // Handle errors
    console.error("Error updating category:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.delete('/deleteCategoryById/:id', authenticateToken, async (req, res) => {
  try {
      // Find the category by ID and delete it
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);

      if (!deletedCategory) {
          return res.status(404).json({ message: 'Category not found' });
      }

      // Respond with success message
      res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;

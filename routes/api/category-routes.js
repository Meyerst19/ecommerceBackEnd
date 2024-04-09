const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//localhost:3001/api/categories
router.get("/", async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status.json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

//localhost:3001/api/categories/:id
router.get("/:id", async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoriesData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status.json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

//localhost:3001/api/categories
router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoriesData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//localhost:3001/api/categories/:id
router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoriesData = await Category.update({
      category_name: req.body.category_name,
      where: {
        id: req.params.id,
      },
    });

    if (!categoriesData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//localhost:3001/api/categories/:id
router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoriesData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

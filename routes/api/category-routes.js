const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    })
    return res.status(200).json(allCategories)
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) { return res.status(404).json('no key found') }
    return res.status(200).json(category)
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  /* req.body should look like this...
   {
     category_name: "Food",
   }
 */
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategory) => {
      res.json(updatedCategory)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});


router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((deletedCategory) => {
      res.json(deletedCategory)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err)
    })
});

module.exports = router;

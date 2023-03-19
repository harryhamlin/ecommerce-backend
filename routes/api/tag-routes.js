const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    })
    return res.status(200).json(allTags)
  } catch (err) {
    return res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id,
      {
        include: { model: Product, through: ProductTag }
      })
    if (!tag) { return res.status(404).json('no tag found') }
    return res.status(200).json(tag)
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // format should be: 
  // {
  // "tag_name": "Royal Purple"
  // }
  try {
    Tag.create(req.body)
      .then((tag) => {
        res.status(200).json(tag)
      })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => {
      res.json(updatedTag)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((deletedTag) => {
      res.json(deletedTag)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err)
    })
});

module.exports = router;

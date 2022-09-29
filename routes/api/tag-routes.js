const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {model: Product, through: ProductTag, as: 'product_tags'}
      ],
    });
    res.status(200).json(tagData);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product, through: ProductTag}
      ]
    })
    if(!tagById){
      res.status(404).json({message: "NO ID found with this Tag!"});
      return;
    };
    res.status(200).json(tagById);
  } catch (err){
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      {
        id: req.body.ida,
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if(!req.params.ida) {
      res.status(404).json({message: "NO ID found with this Tag!"});
      return;
    };
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = Tag.destory({
      where: {
        id: req.params.id
      }
    });
    if(!deletedTag){
      res.status(404).json({message: "NO ID found with this Tag!"})
    }
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;

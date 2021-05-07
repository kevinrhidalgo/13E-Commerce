const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }]
    },{include: [{model: Tag}]
  });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async(req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  console.log("test")
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, {model: Tag}],
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const proData = await Product.create(req.body);
    res.status(200).json(proData);
  } catch (err) {
    res.status(400).json(err);
  }


  
 //this helps update products

    router.put('/:id', async(req, res) => {
    try {
      const proData = await Product.update(req.body, {where:{id:req.params.id}});
      res.status(200).json(proData);
    } catch (err) {
      res.status(400).json(err);
    }


router.delete('/:id', async(req, res) => {
  // delete one product by its `id` value
  try {
    const proData = await Product.destroy({where:{id:req.params.id}});
    res.status(200).json(proData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

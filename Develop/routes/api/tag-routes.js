const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }, { model: ProductTag }],
      // attributes: {
        // include: [
        //   [
        //     // Use plain SQL to get a count of all short books
        //     sequelize.literal(
        //       '(SELECT COUNT(*) FROM book WHERE pages BETWEEN 100 AND 300 AND book.reader_id = reader.id)'
        //     ),
        //     'shortBooks',
        //   ],
        // ],
      // },
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }],
      // attributes: {
      //   include: [
      //     [
      //       // Use plain SQL to get a count of all short books
      //       sequelize.literal(
      //         '(SELECT COUNT(*) FROM book WHERE pages BETWEEN 100 AND 300 AND book.reader_id = reader.id)'
      //       ),
      //       'shortBooks',
      //     ],
      //   ],
      // },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

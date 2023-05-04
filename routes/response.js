const express = require('express');
const router = express.Router();
const { generateShoeList } = require('../generateShoeList');

router.get('/', (req, res) => {
    res.render('response', { response: '' });
});

router.post('/', async (req, res) => {
    const input = req.body.input;
    const shoeList = await generateShoeList(input);
    res.json({ shoeList });
});

module.exports = router;


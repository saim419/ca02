/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const ToDoItem = require('../models/ToDoItem');

/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

// get the value associated to the key
router.get('/todo/', async (req, res, next) => {
  try {
    const completed = req.query.show == 'completed'
    res.locals.show = req.query.show
    res.locals.items = await ToDoItem.find({ userId: req.user?._id, completed })
      .sort({ completed: 1, priority: 1, createdAt: 1 })
      .select('item createdAt completed priority description category amount date');

    res.render('toDoList');
  } catch (err) {
    next(err);
  }
});



/* add the value in the body to the list associated to the key */
router.post('/todo',
  async (req, res, next) => {
    const todo = new ToDoItem(
      {
        item: req.body.item,
        createdAt: new Date(),
        completed: false,
        priority: parseInt(req.body.priority),
        userId: req.user._id,
        description: req.body.description,
        category: req.body.category,
        amount: parseFloat(req.body.amount),
        date: new Date(req.body.date),
      })
    await todo.save();
    res.redirect('/todo')
  });


router.get('/todo/remove/:itemId',
  async (req, res, next) => {
    console.log("inside /todo/remove/:itemId")
    await ToDoItem.deleteOne({ _id: req.params.itemId });
    res.redirect('/todo')
  });


router.get('/todo/complete/:itemId',
  async (req, res, next) => {
    console.log("inside /todo/complete/:itemId")
    await ToDoItem.findOneAndUpdate(
      { _id: req.params.itemId },
      { $set: { completed: true } });
    res.redirect('/todo')
  });

router.get('/todo/uncomplete/:itemId',
  async (req, res, next) => {
    console.log("inside /todo/uncomplete/:itemId")
    await ToDoItem.findOneAndUpdate(
      { _id: req.params.itemId },
      { $set: { completed: false } });
    res.redirect('/todo')
  });



module.exports = router;

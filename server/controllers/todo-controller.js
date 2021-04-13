var { Todo } = require("../models/todo");
var { ObjectID } = require("mongodb");
const _ = require("lodash");

/**
 * Create and Add Todo
 * @param {express request object} req
 * @param {express response object} res
 */
exports.create = (req, res) => {
  var todo = new Todo({
    text: req.body.text,
  });
  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(e => res.status(400).send(e));
};

/**
 * Find all Todos
 * @param {*} req
 * @param {*} res
 */
exports.findAll = (req, res) => {
  Todo.find({
  })
    .then(todos => {
      res.send({ todos }); //send object instead array so can add more fields to JSON
    })
    .catch(e => res.status(400).send(e));
};

/**
 * Find Todo by Id
 * @param {*} req
 * @param {*} res
 */
exports.findByID = (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOne({
    _id: id,
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
};

/**
 * Delete Todo by Id
 * @param {*} req
 * @param {*} res
 */
exports.deleteById = async (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  try{
    const todo = await Todo.findOneAndRemove({
      _id: id,
    })
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo})
  }catch(e){
    res.status(400).send();
  }
};

/**
 * Update a Todo by Id
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  try{
    const todo = await Todo.findOneAndUpdate(
        { _id: id },
        { $set: body },
        { new: true }
      )
      if(!todo){
        res.status(404).send();
      }
      res.send({todo})
  }catch(e){
    res.status(404).send();
  }
};

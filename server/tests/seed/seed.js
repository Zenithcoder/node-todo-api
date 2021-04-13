const { ObjectID } = require("mongodb");
const { Todo } = require("../../models/todo");
 
const todos = [
  {
    _id: new ObjectID(),
    text: "First Todo",
    completed: false,
  },
  {
    _id: new ObjectID(),
    text: "Second Todo",
    completed: "333",
    completedAt: new Date().getTime(),
  }
];

const populateTodos = done => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos).then(() => {
      done();
    });
  });
};

module.exports = { todos, populateTodos};

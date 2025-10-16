const express = require("express");
const app = express();
const PORT = 9000;
const TODO = require("./models/todo");
const { connectDb } = require("./utils/db");
app.use(express.json());

// create a todo
app.post("/todo", async (req, res) => {
  try {
    const data = req.body;
    const createTodo = await TODO.create(data);
    res.status(201).send(createTodo);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send("Task already existed..");
    }
    res.status(500).send("error\n" + error);
  }
});

// get all todos
app.get("/todo", async (req, res) => {
  try {
    const todos = await TODO.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send("error\n" + error);
  }
});

// get todo by id.     {_id:id}
app.get("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getTodoById = await TODO.findById(id);
    res.status(200).send(getTodoById);
  } catch (error) {
    res.status(500).send("error\n" + error);
  }
});

// update a todo by id
app.patch("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    // const updatedTodo = await TODO.findByIdAndUpdate(id, data);
    // for findById _id:id is not needed
    console.log(data);
    const updatedTodo = await TODO.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(updatedTodo);
  } catch (error) {
    res.status(500).send("error\n" + error.message);
  }
});

// delete a todo by title
app.delete("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await TODO.findByIdAndDelete(id);
    res.status(200).send(deleteTodo);
  } catch (error) {
    res.status(500).send("error\n" + error);
  }
});

// start server after db connection
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`connection failed.. `, err);
  });
